import {CanActivateFn, Router} from '@angular/router'
import {LocalStorageService} from '../../services/local-storage.service'

export const authGuard: CanActivateFn = (async (route, state) => {
	const router = new Router()

	const isAuthenticated = LocalStorageService.get('@auth')
	console.log(isAuthenticated)

	if (isAuthenticated) return true


	await router.navigate(['/'])
	return false
})
