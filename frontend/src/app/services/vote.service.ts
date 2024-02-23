import { Injectable } from '@angular/core'
import {catchError, retry, throwError} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {LocalStorageService} from './local-storage.service'

@Injectable({
	providedIn: 'root'
})
export class VoteService {
	private URL: string = 'http://localhost:3000'
	constructor(private http: HttpClient) { }

	private getToken(): string {
		return LocalStorageService.get<{ token: string }>('@auth').token
	}

	private postHeaders(): any {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.getToken()}`
		})

		return { withCredentials: true, headers }
	}

	private noAuthHeaders(): any {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})

		return { headers }
	}

	public vote(questionId: string, cpf: string, answer: string) {
		return this
			.http
			.post(`${this.URL}/v1/vote/${questionId}`, { cpf, answer}, this.noAuthHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public registerVoter(cpf: string, name: string) {
		return this
			.http
			.post(`${this.URL}/v1/vote/voter`, { cpf, name}, this.postHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public canVote(cpf: string) {
		return this
			.http
			.get(`${this.URL}/v1/vote/voter/${cpf}/can`, this.noAuthHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}
}
