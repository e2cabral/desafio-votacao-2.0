import {VotingEntity} from '../../../domain/entities/question.entity'
import {logger} from '../../../main/config/logger.config'
import {VotingModel} from '../../schemas/voting.schema'
import {QuestionModel} from '../../schemas/question.schema'

export namespace Voting {
	export const create = async (questionId: string, voting: VotingEntity) => {
		try {
			const vote = await VotingModel.create(voting)
			const question = await QuestionModel.findOne({ _id: questionId })

			await question?.updateOne({ $push: { votes: vote._id } })

			return vote
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}