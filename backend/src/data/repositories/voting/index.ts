import {VotingEntity} from '../../../domain/entities/question.entity'
import {logger} from '../../../main/config/logger.config'
import {VotingModel} from '../../schemas/voting.schema'
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
				.some((vote: any) => vote.userId.toString() === voting.userId)

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
}