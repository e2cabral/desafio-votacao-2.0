import {FastifyReply, FastifyRequest} from 'fastify'
import { logger } from '../../../main/config/logger.config'
import {QuestionService} from '../../../domain/services/question'

export const startSession = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const id = request.params!.id

		const result = await QuestionService.startSession(id)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}