import { Component } from '@angular/core'
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import {SubmitButtonComponent} from '../../components/submit-button/submit-button.component'
import {HeaderComponent} from '../../components/header/header.component'
import {ToastService} from '../../services/toast.service'
import {VoteService} from '../../services/vote.service'
import {Router} from '@angular/router'

@Component({
	selector: 'app-register-voters',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		SubmitButtonComponent,
		HeaderComponent
	],
	templateUrl: './register-voters.component.html',
	styleUrl: './register-voters.component.css'
})
export class RegisterVotersComponent {
	constructor(private toast: ToastService, private voteService: VoteService, private router: Router) {
	}

	public onSubmit() {
		const { cpf, name } = this.form.value

		if (this.form.invalid) {
			this.toast.error('Verifique os campos e tente novamente', '')
			return
		}

		this
			.voteService
			.registerVoter(cpf!, name!)
			.subscribe(() => {
				this.toast.success('Eleitor cadastrado com sucesso', '')
				this.router.navigate(['/voting'])
			})
	}

	public form = new FormGroup({
		cpf: new FormControl('', { validators: [
			Validators.required,
			Validators.pattern(/^\d{11}$/),
			Validators.minLength(11),
			Validators.maxLength(11),
			Validators.nullValidator,
		]}),
		name: new FormControl('', { validators: [
			Validators.required,
			Validators.nullValidator,
		]}),
	})
}
