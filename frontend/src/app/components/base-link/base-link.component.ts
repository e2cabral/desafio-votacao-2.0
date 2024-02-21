import {Component, Input} from '@angular/core'
import {RouterLink} from '@angular/router'

@Component({
	selector: 'app-base-link',
	standalone: true,
	imports: [
		RouterLink
	],
	templateUrl: './base-link.component.html',
	styleUrl: './base-link.component.css'
})
export class BaseLinkComponent {
  @Input() public name: string = ''
  @Input() public url: string = ''
}
