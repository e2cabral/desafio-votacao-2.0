import {Auth} from '../../data/repositories/auth'
import {logger} from '../../main/config/logger.config'
import {FastifyInstance} from 'fastify'

export default class AuthService {
	async login(email: string, password: string, app: FastifyInstance) {
		try {
			return Auth.login(email, password, app)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}