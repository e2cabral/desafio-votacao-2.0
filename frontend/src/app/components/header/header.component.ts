import { Component } from '@angular/core'
import {RouterLink} from '@angular/router'
import {BaseLinkComponent} from '../base-link/base-link.component'
import {LocalStorageService} from '../../services/local-storage.service'

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

	checkLoggedUser() {
		return LocalStorageService.get('@auth')
	}

}
