import {Component, Input} from '@angular/core'

@Component({
	selector: 'app-submit-button',
	standalone: true,
	imports: [],
	templateUrl: './submit-button.component.html',
	styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
	@Input() public text: string = ''
	@Input() public type: 'submit' | 'reset' | 'button' = 'submit'
}
