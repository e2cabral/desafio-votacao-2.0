import { Component } from '@angular/core'
import {RouterLink} from '@angular/router'
import {BaseLinkComponent} from '../base-link/base-link.component'

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		RouterLink,
		BaseLinkComponent
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent {

}
