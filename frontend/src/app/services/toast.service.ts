import { Injectable } from '@angular/core'
import {ToastrService} from 'ngx-toastr'

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toastr: ToastrService) { }

	success(title: string, message: string) {
		return this.toastr.success(title, message, {
			closeButton: true,
			progressBar: true,
			timeOut: 3000
		})
	}

	error(title: string, message: string) {
		return this.toastr.error(title, message, {
			closeButton: true,
			progressBar: true,
			timeOut: 3000
		})
	}
}
