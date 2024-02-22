import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor() { }

	static get<T>(key: string): T {
		const item = localStorage.getItem(key)

		return item ? JSON.parse(item as string) : null
	}

	static set<T>(key: string, value: T) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	static unset(key: string) {
		localStorage.removeItem(key)
	}

	static clear() {
		localStorage.clear()
	}
}
