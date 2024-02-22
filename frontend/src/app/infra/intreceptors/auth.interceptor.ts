import { HttpInterceptorFn } from '@angular/common/http'
import {LocalStorageService} from '../../services/local-storage.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authToken = LocalStorageService.get<{ token: string }>('@auth').token
	if (authToken) {
		const authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`
			}
		})
		return next(authReq)
	}

	return next(req)
}
