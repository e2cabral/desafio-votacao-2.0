import {FastifyReply, FastifyRequest} from 'fastify'
import {QuestionServiceFactory} from '../../../infra/patterns/factories/question-service.factory'
import { logger } from '../../../main/config/logger.config'

export const findStarted = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const service = QuestionServiceFactory()

		const {page, itemsPerPage} = request.query

		const result = await service.findStarted(page, itemsPerPage)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}