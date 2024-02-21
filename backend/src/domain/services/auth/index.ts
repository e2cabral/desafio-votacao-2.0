import {AuthRepository} from '../../../data/repositories/auth'
import {logger} from '../../../main/config/logger.config'
import {FastifyRequest} from 'fastify'
import {UserEntity} from '../../entities/user.entity'

export namespace AuthService {
	export const login = async (email: string, password: string, request: FastifyRequest) => {
		try {
			return AuthRepository.login(email, password, request)
		} catch (err) {
			logger.error((err as Error).message)
			throw err
		}
	}

	export const register = async (user: UserEntity) => {
		try {
			return AuthRepository.register(user)
		} catch (err) {
			logger.error((err as Error).message)
			throw err
		}
	}
}