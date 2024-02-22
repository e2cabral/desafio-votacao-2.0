import { Component } from '@angular/core'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {Router, RouterLink} from '@angular/router'
import {SubmitButtonComponent} from '../../components/submit-button/submit-button.component'
import {HeaderComponent} from '../../components/header/header.component'
import {LocalStorageService} from '../../services/local-storage.service'
import {ToastService} from '../../services/toast.service'
import {QuestionsService} from '../../services/questions.service'

@Component({
	selector: 'app-create-question',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		RouterLink,
		SubmitButtonComponent,
		HeaderComponent
	],
	templateUrl: './create-question.component.html',
	styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {
	constructor(private toast: ToastService, private questionService: QuestionsService, private router: Router) {
	}
	public onSubmit() {
		if (this.form.invalid) {
			this.toast.error('Os campos Nome e Descrição são obrigatórios', '')
			return
		}
		const {
			name, description, year,
			month, day, hour,
			minutes, seconds, votes,
			createdBy, sessionStartedDate
		} = this.form.value


		this
			.questionService
			.createQuestion({
				name: name!,
				description: description!,
				sessionTime: { year, month, day, hour, minutes, seconds },
				votes: votes!,
				createdBy: createdBy!,
				sessionStartedDate: sessionStartedDate!
			})
			.subscribe(
				() => {
					this.toast.success('Pauta criada com sucesso', '')
					this.router.navigate(['/home'])
				})

		return
	}
	public form = new FormGroup({
		name: new FormControl('', { validators: [Validators.nullValidator] }),
		description: new FormControl('', { validators: [Validators.nullValidator] }),
		year: new FormControl(),
		month: new FormControl(),
		day: new FormControl(),
		hour: new FormControl(),
		minutes: new FormControl(),
		seconds: new FormControl(),
		votes: new FormControl([]),
		createdBy: new FormControl(LocalStorageService.get<{ id: string }>('@auth').id),
		sessionStartedDate: new FormControl(null)
	})
}
