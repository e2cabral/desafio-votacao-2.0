import {FastifyReply, FastifyRequest} from 'fastify'
import { logger } from '../../../main/config/logger.config'
import {QuestionService} from '../../../domain/services/question'

export const findByCreator = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const {page, itemsPerPage} = request.query
		const { userId } = request.params

		const result = await QuestionService.findByCreator(userId, page, itemsPerPage)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}