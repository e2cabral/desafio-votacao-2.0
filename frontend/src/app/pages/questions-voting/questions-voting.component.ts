import { Component } from '@angular/core'
import {HeaderComponent} from '../../components/header/header.component'

@Component({
	selector: 'app-questions-voting',
	standalone: true,
	imports: [
		HeaderComponent
	],
	templateUrl: './questions-voting.component.html',
	styleUrl: './questions-voting.component.css'
})
export class QuestionsVotingComponent {

}
