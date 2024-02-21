import { Component } from '@angular/core'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {SubmitButtonComponent} from '../../components/submit-button/submit-button.component'
import {AuthService} from '../../services/auth.service'
import {Router, RouterLink} from '@angular/router'
import {UserAuth} from '../../domain/models/user-auth.model'
import {User} from '../../domain/models/user.model'
import {ToastService} from '../../services/toast.service'

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		SubmitButtonComponent,
		RouterLink
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {
	constructor(private auth: AuthService, private router: Router, private toast: ToastService) {
	}

	public form = new FormGroup({
		email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email, Validators.nullValidator] }),
		password: new FormControl<string>('', { nonNullable: true }),
		name: new FormControl<string>('', { nonNullable: true }),
		phone: new FormControl<string>('', { nonNullable: true }),
		votes: new FormControl<string[]>([], { nonNullable: true }),
		questions: new FormControl<string[]>([], { nonNullable: true }),
	})

	public async onSubmit() {
		if (this.form.invalid) {
			return
		}

		const user: User = {
			email: this.form.value.email!,
			password: this.form.value.password!,
			name: this.form.value.name!,
			phone: this.form.value.phone!,
			votes: this.form.value.votes!,
			questions: this.form.value.questions!,
		}

		return this
			.auth
			.register(user)
			.subscribe(() => {
				this
					.toast
					.success(
						'Usuário cadastrado com sucesso.',
						'Volte para a tela de login para logar.'
					)
					.onAction
					.subscribe(() => {})
					.unsubscribe()

				this.router.navigate(['/'])
				return
			})
	}
}
