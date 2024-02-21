import {Auth} from '../../data/repositories/auth'
import {logger} from '../../main/config/logger.config'
import {FastifyRequest} from 'fastify'

export default class AuthService {
	async login(email: string, password: string, request: FastifyRequest) {
		try {
			return Auth.login(email, password, request)
		} catch (err) {
			logger.error((err as Error).message)
			throw err
		}
	}
}