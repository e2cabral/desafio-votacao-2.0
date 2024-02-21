import { Component } from '@angular/core'
import {Router, RouterLink, RouterOutlet} from '@angular/router'
import {SubmitButtonComponent} from '../../components/submit-button/submit-button.component'
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import {AuthService} from '../../services/auth.service'
import {UserAuth} from '../../domain/models/user-auth.model'
import {LocalStorageService} from '../../services/local-storage.service'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterOutlet, SubmitButtonComponent, ReactiveFormsModule, RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	constructor(private auth: AuthService, private router: Router, private localStorage: LocalStorageService) {
	}

	public form = new FormGroup({
		email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.nullValidator] }),
		password: new FormControl('', { nonNullable: true }),
	})

	public async onSubmit() {
		if (this.form.invalid) {
			return
		}

		const user: UserAuth = {
			email: this.form.value.email!,
			password: this.form.value.password!,
		}

		return this
			.auth
			.login(user)
			.subscribe(res => {
				const body = (res as { body: string }).body
				this.localStorage.set('@auth', body)
				this.router.navigate(['/home'])

				return
			})
	}
}
