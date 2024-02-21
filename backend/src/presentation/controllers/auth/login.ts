import {FastifyReply, FastifyRequest} from 'fastify'
import {ConvertTo} from '../../helpers/convertion.helper'
import {UserEntity} from '../../../domain/entities/user.entity'
import {logger} from '../../../main/config/logger.config'
import {AuthService} from '../../../domain/services/auth'

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const user = ConvertTo<Omit<UserEntity, 'name | phone | votes | questions'>>(request.body)

		const info = await AuthService.login(user.email, user.password, request)

		reply.setCookie('access_token', info.token, {
			path: '/',
			httpOnly: true,
			secure: true,
		})

		reply.status(200).send({ body: info })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}