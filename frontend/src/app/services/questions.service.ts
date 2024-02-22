import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError, retry, throwError} from 'rxjs'
import Question from '../domain/models/question.model'
import {LocalStorageService} from './local-storage.service'

@Injectable({
	providedIn: 'root'
})
export class QuestionsService {

	constructor(private http: HttpClient) { }
	private URL: string = 'http://localhost:3000'

	private getToken(): string {
		return LocalStorageService.get<{ token: string }>('@auth').token
	}

	private getHeaders(): any {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.getToken()}`
		})

		return { withCredentials: true, headers }
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

	public findStarted(page: number, itemsPerPage: number) {
		return this
			.http
			.get(`${this.URL}/v1/question/started?page=${page}&=itemsPerPage=${itemsPerPage}`, this.getHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public findByCreator(page: number, itemsPerPage: number, userId: string) {
		return this
			.http
			.get(`${this.URL}/v1/question/${userId}/creator?page=${page}&=itemsPerPage=${itemsPerPage}`, this.getHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public findById(questionId: string) {
		return this
			.http
			.get(`${this.URL}/v1/question/${questionId}`, this.noAuthHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err.message })
				)
			)
	}

	public createQuestion(question: Question) {
		return this
			.http
			.post(`${this.URL}/v1/question`, question, this.postHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err })
				)
			)
	}

	public start(questionId: string) {
		return this
			.http
			.patch(`${this.URL}/v1/question/start/${questionId}`, {}, this.postHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err })
				)
			)
	}

	public vote(questionId: string, cpf: string, answer: string) {
		return this
			.http
			.post(`${this.URL}/v1/vote/${questionId}`, { cpf, answer}, this.noAuthHeaders())
			.pipe(
				retry(1),
				catchError(
					(err) => throwError(() => { err })
				)
			)
	}
}
