import {FastifyReply, FastifyRequest} from 'fastify'
import {VotingServiceFactory} from '../../../infra/patterns/factories/voting-service.factory'
import {ConvertTo} from '../../helpers/convertion.helper'
import {VotingEntity} from '../../../domain/entities/question.entity'
import {logger} from '../../../main/config/logger.config'

export const vote = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const service = VotingServiceFactory()

		const voting = ConvertTo<VotingEntity>(request.body)
		const { questionId } = ConvertTo<{ questionId: string }>(request.params)

		const result = await service.vote(questionId, voting)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}