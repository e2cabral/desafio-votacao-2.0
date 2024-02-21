import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor() { }

	get<T>(key: string): T {
		const item = localStorage.getItem(key)

		return item ? JSON.parse(item) as T : JSON.parse('{}')
	}

	set<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	unset(key: string) {
		localStorage.removeItem(key)
	}

	clear() {
		localStorage.clear()
	}
}
