import {FastifyReply, FastifyRequest} from 'fastify'
import {AuthServiceFactory} from '../../../infra/patterns/factories/auth-service.factory'
import {ConvertTo} from '../../helpers/convertion.helper'
import {UserEntity} from '../../../domain/entities/user.entity'
import {logger} from '../../../main/config/logger.config'

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const service = AuthServiceFactory()
		const user = ConvertTo<UserEntity>(request.body)

		const result = await service.register(user)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}