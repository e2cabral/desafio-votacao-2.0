import { Component } from '@angular/core'
import {HeaderComponent} from '../../components/header/header.component'
import {ProfileCardComponent} from '../../components/profile-card/profile-card.component'

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		HeaderComponent,
		ProfileCardComponent
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {

}
