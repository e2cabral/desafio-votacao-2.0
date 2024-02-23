import {FastifyReply, FastifyRequest} from 'fastify'
import {ConvertTo} from '../../helpers/convertion.helper'
import {VotingEntity} from '../../../domain/entities/question.entity'
import {logger} from '../../../main/config/logger.config'
import {VotingService} from '../../../domain/services/voting'
import {VoterEntity} from '../../../domain/entities/voting.entity'

export const vote = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const voting = ConvertTo<VotingEntity>(request.body)
		const { questionId } = ConvertTo<{ questionId: string }>(request.params)

		const result = await VotingService.vote(questionId, voting)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}

export const registerVoter = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const voter = ConvertTo<VoterEntity>(request.body)

		const result = await VotingService.registerVoter(voter)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}

export const canVote = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const { cpf } = ConvertTo<{ cpf: string }>(request.params)

		const result = await VotingService.canVote(cpf)

		reply.status(200).send({ body: result })
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		reply.status(400).send({ body: message })
	}
}