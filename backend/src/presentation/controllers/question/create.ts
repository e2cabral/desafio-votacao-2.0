import {FastifyReply, FastifyRequest} from 'fastify'
import { logger } from '../../../main/config/logger.config'
import {ConvertTo} from '../../helpers/convertion.helper'
import QuestionEntity from '../../../domain/entities/question.entity'
import {QuestionService} from '../../../domain/services/question'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const question = ConvertTo<QuestionEntity>(request.body)

		const result = await QuestionService.create(question)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}