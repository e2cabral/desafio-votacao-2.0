import {FastifyReply, FastifyRequest} from 'fastify'
import { logger } from '../../../main/config/logger.config'
import {QuestionService} from '../../../domain/services/question'

export const findById = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const { questionId } = request.params

		const result = await QuestionService.findById(questionId)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}