import {Component, OnInit} from '@angular/core'
import {HeaderComponent} from '../../components/header/header.component'
import {QuestionsService} from '../../services/questions.service'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {faFaceSadTear, faXmark, faPlus} from '@fortawesome/free-solid-svg-icons'
import Question from '../../domain/models/question.model'
import {LocalStorageService} from '../../services/local-storage.service'
import {Router} from '@angular/router'

@Component({
	selector: 'app-questions-voting',
	standalone: true,
	imports: [
		HeaderComponent,
		FontAwesomeModule
	],
	templateUrl: './questions-voting.component.html',
	styleUrl: './questions-voting.component.css'
})
export class QuestionsVotingComponent implements OnInit {
	sadTearIcon = faFaceSadTear
	xMarkIcon = faXmark
	pluIcon = faPlus
	ngOnInit() {
		this.findStarted(1, 10)
		this.findByCreator(1, 6)
	}
	constructor(private questionService: QuestionsService, private router: Router) {}

	public questions: Question[] = []
	public creatorQuestions: Question[] = []

	public async navigateToCreateQuestion() {
		await this.router.navigate(['/create-question'])
	}

	public findStarted(page: number, itemsPerPage: number) {
		this.questionService
			.findStarted(page, itemsPerPage)
			.subscribe(res => {
				this.questions = (res as unknown as {body: Question[]}).body
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
}
