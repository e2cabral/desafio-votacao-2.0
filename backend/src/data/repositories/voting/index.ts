import {VoterEntity, VotingEntity} from '../../../domain/entities/voting.entity'
import {logger} from '../../../main/config/logger.config'
import {VoterModel, VotingModel} from '../../schemas/voting.schema'
import {QuestionModel} from '../../schemas/question.schema'

export namespace Voting {
	export const vote = async (questionId: string, voting: VotingEntity) => {
		try {
			const questionVoted = await QuestionModel
				.findOne({ _id: questionId })
				.populate('votes')
				.exec()

			const hasAlreadyVoted = questionVoted!
				.votes
				.some((vote: any) => vote.cpf.toString() === voting.cpf)

			if (hasAlreadyVoted) {
				throw new Error('User has already voted')
			}

			const voted = await VotingModel.create(voting)
			const question = await QuestionModel.findOne({ _id: questionId })

			await question?.updateOne({ $push: { votes: voted._id } })

			return voted
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}

	export const registerVoter = async (voterInfo: VoterEntity) => {
		try {
			const voterAlreadyExists = await VoterModel.findOne({ cpf: voterInfo.cpf })
			if (voterAlreadyExists) {
				throw new Error('Voter already exists')
			}
			
			return await VoterModel.create(voterInfo)
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}

	export const canVote = async (cpf: string) => {
		try {
			const voter = await VoterModel.findOne({ cpf: cpf }).exec()
			return voter !== null
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}
}