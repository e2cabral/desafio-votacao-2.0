import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {UserAuth} from '../domain/models/user-auth.model'
import {catchError, retry, throwError} from 'rxjs'
import {User} from '../domain/models/user.model'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private URL: string = 'http://localhost:3000'
	private HTTP_HEADER = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	constructor(private http: HttpClient) { }

	public login(user: UserAuth) {
		return this
			.http
			.post(`${this.URL}/v1/login`, user, this.HTTP_HEADER)
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public register(user: Omit<User, '_id'>) {
		return this
			.http
			.post(`${this.URL}/v1/register`, user, this.HTTP_HEADER)
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}
}
