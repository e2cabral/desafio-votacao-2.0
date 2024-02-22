import {Component, OnInit} from '@angular/core'
import {HeaderComponent} from '../../components/header/header.component'
import {QuestionsService} from '../../services/questions.service'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faFaceSadTear, faPlus, faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import Question, {Voting} from '../../domain/models/question.model'
import {LocalStorageService} from '../../services/local-storage.service'
import {Router, RouterLink} from '@angular/router'
import {QuestionsReturn} from '../../domain/types/questions-return.type'
import {NgClass, NgStyle} from '@angular/common'

@Component({
	selector: 'app-questions-voting',
	standalone: true,
	imports: [
		HeaderComponent,
		FontAwesomeModule,
		RouterLink,
		NgStyle,
		NgClass
	],
	templateUrl: './questions-voting.component.html',
	styleUrl: './questions-voting.component.css'
})
export class QuestionsVotingComponent implements OnInit {
	sadTearIcon = faFaceSadTear
	pluIcon = faPlus
	checkIcon = faCircleCheck
	xIcon = faCircleXmark


	ngOnInit() {
		this.findStarted()
		this.findByCreator(1, 6)
	}
	constructor(private questionService: QuestionsService, private router: Router) {}

	public questions: Question[] = []
	public total: number = 0
	public totalQuestions: number = 0
	public creatorQuestions: Question[] = []

	public currentPage: number = 1
	public itemsPerPage: number = 10
	public totalPages: number = 0
	public pages: number[] = []

	public async navigateToCreateQuestion() {
		await this.router.navigate(['/create-question'])
	}

	public findStarted() {
		this.questionService
			.findStarted(this.currentPage, this.itemsPerPage)
			.subscribe(res => {
				const {total, data} = (res as unknown as QuestionsReturn).body
				this.questions = data
				this.totalQuestions = data.length
				this.total = total

				this.totalPages = Math.ceil(this.totalQuestions / this.itemsPerPage)
				this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1)
			})
	}

	public findByCreator(page: number, itemsPerPage: number) {
		const user = LocalStorageService.get<{ id: string }>('@auth')
		this.questionService
			.findByCreator(page, itemsPerPage, user.id)
			.subscribe(res => {
				this.creatorQuestions = (res as unknown as {body: Question[]}).body
			})
	}

	formatDateBrLocale(date: string) {
		return new Date(date)
			.toLocaleDateString(
				'pt-BR',
				{
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				}
			)
	}

	nextPage() {
		if (this.currentPage < this.totalPages) {
			this.currentPage++
			this.findStarted()
		}
	}

	prevPage() {
		if (this.currentPage > 1) {
			this.currentPage--
			this.findStarted()
		}
	}

	goToPage(page: number) {
		this.currentPage = page
		this.findStarted()
	}

	checkVoted(questionId: string | undefined) {
		const user = LocalStorageService.get<{ id: string }>('@auth')
		if (user) {
			const question = this.questions.find(q => q._id === questionId)
			return !!(question?.votes as Voting[]).find((v) => v.userId === user.id)
		}
		return false
	}

	reduceText(text: string) {
		const maxLength = 50
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
	}

	checkIsFinished(dateFinish: string) {
		const today = new Date()
		const dateShouldFinish = new Date(dateFinish)

		return dateShouldFinish > today
	}
}
