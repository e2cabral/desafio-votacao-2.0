import {FastifyReply, FastifyRequest} from 'fastify'
import { logger } from '../../../main/config/logger.config'
import {QuestionServiceFactory} from '../../../infra/patterns/factories/question-service.factory'
import {ConvertTo} from '../../helpers/convertion.helper'
import QuestionEntity from '../../../domain/entities/question.entity'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const service = QuestionServiceFactory()

		const question = ConvertTo<QuestionEntity>(request.body)

		const result = await service.create(question)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}