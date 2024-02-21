import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import {ConvertTo} from '../../helpers/convertion.helper'
import {UserEntity} from '../../../domain/entities/user.entity'
import {AuthServiceFactory} from '../../../infra/patterns/factories/auth-service.factory'
import {logger} from '../../../main/config/logger.config'

export const login = async (request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) => {
	try {
		const service = AuthServiceFactory()
		const user = ConvertTo<Omit<UserEntity, 'name | phone | votes | questions'>>(request.body)

		const token = await service.login(user.email, user.password, app)

		reply.status(200).send({ body: token })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}