import {FastifyReply, FastifyRequest} from 'fastify'
import {ConvertTo} from '../../helpers/convertion.helper'
import {UserEntity} from '../../../domain/entities/user.entity'
import {UserModel} from '../../../data/schemas/user.schema'
import { logger } from '../../../main/config/logger.config'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const user = ConvertTo<UserEntity>(request.body)

		const result = await UserModel.create(user)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}