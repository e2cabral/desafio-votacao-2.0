import {Component, OnInit} from '@angular/core'
import {HeaderComponent} from '../../components/header/header.component'
import {QuestionsService} from '../../services/questions.service'
import {ActivatedRoute} from '@angular/router'
import Question, {SessionTime, Voting} from '../../domain/models/question.model'
import {User} from '../../domain/models/user.model'
import {ToastService} from '../../services/toast.service'
import {LocalStorageService} from '../../services/local-storage.service'
import {QuestionWithPercentage} from '../../domain/types/questions-return.type'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {SubmitButtonComponent} from '../../components/submit-button/submit-button.component'
import {VoteService} from '../../services/vote.service'

@Component({
	selector: 'app-question',
	standalone: true,
	imports: [
		HeaderComponent,
		ReactiveFormsModule,
		SubmitButtonComponent
	],
	templateUrl: './question.component.html',
	styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit{
	ngOnInit() {
		this.active.params.subscribe((data) => {
			this.questionId = data['id']
			this.findById(data['id'])
		})

		const canVote = LocalStorageService.get<boolean>('@can-vote')
		const logged = LocalStorageService.get('@auth')

		if (logged) {
			this.userCanVote =true
		}

		if (canVote) {
			LocalStorageService.unset('@cpf')
			this.userCanVote = canVote
		}
	}
	constructor(private questionService: QuestionsService, private voteService: VoteService, private active: ActivatedRoute, private toast: ToastService) {
	}

	public questionId: string = ''
	public question: Question | undefined
	public yesVotes: number = 0
	public noVotes: number = 0
	public userCanVote: boolean = false

	public findById(id: string) {
		this.questionService
			.findById(id)
			.subscribe(res => {
				const { question, yesVotesPercentage, noVotesPercentage } = (res as unknown as QuestionWithPercentage).body
				this.question = question
				this.yesVotes = yesVotesPercentage
				this.noVotes = noVotesPercentage
			})
	}

	public formatSessionTime(session: SessionTime | undefined) {
		if (!session) return ''

		let {
			year,
			month,
			day,
			hour,
			minutes,
			seconds
		} = session

		if (!year) year = 0
		if (!month) month = 0
		if (!day) day = 0
		if (!hour) hour = 0
		if (!minutes) minutes = 0
		if (!seconds) seconds = 0

		const yearText = `${year} ${year > 1 ? 'Anos' : 'Ano'}`
		const monthText = `${month} ${month > 1 ? 'Meses' : 'Mês'}`
		const dayText = `${day} ${day > 1 ? 'Dias' : 'Dia'}`
		const hourText = `${hour} ${hour > 1 ? 'Horas' : 'Hora'}`
		const minutesText = `${minutes} ${minutes > 1 ? 'Minutos' : 'Minuto'}`
		const secondsText = `${seconds} ${seconds > 1 ? 'Segundos' : 'Segundo'}`

		return `${yearText}, ${monthText}, ${dayText}, ${hourText}, ${minutesText}, ${secondsText}`
	}

	getCreator() {
		return this.question?.createdBy as User
	}

	public start() {
		this
			.questionService
			.start(this.questionId)
			.subscribe(() => {
				this
					.toast
					.success('Votação iniciada com sucesso', '')
					.onHidden.subscribe(() => location.reload())
			})
	}

	public vote(answer: string) {
		const cpf = LocalStorageService.get<string>('@cpf')
		this
			.voteService
			.vote(this.questionId, cpf, answer)
			.subscribe(() => {
				this
					.toast
					.success('Voto contabilizado com sucesso', '')
					.onHidden.subscribe(() => {
						location.reload()
					})
			})
	}

	public canVote(cpf: string) {
		return this
			.voteService
			.canVote(cpf)
	}

	checkLoggedUser() {
		return LocalStorageService.get('@auth')
	}

	checkVoted() {
		const cpf = LocalStorageService.get('@cpf')
		if (cpf) {
			return !!(this.question?.votes as Voting[]).find((v) => v.cpf === cpf)
		}
		return false
	}

	shouldFinish(dateFinish: string | undefined) {
		if (!dateFinish) return false

		const today = new Date()
		const dateShouldFinish = new Date(dateFinish)

		return today > dateShouldFinish
	}

	verifyCpf() {
		return LocalStorageService.get('@cpf')
	}

	public checkToVote() {
		if (this.newForm.invalid) {
			this.toast.error('CPF inválido', '')
			return
		}

		const cpf = this.newForm.value.cpf ? this.newForm.value.cpf : null

		if (cpf) {
			this.canVote(cpf)
				.subscribe((canVote: any) => {
					this.userCanVote = (canVote as { body: boolean }).body
					LocalStorageService.set('@cpf', this.newForm.value.cpf)
					LocalStorageService.set('@can-vote', this.userCanVote)
				})
		}
	}

	public newForm = new FormGroup({
		cpf: new FormControl('', { validators: [
			Validators.required,
			Validators.pattern(/^\d{11}$/),
			Validators.minLength(11),
			Validators.maxLength(11),
			Validators.nullValidator,
		]})
	})
}
