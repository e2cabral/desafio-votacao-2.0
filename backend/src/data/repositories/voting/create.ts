import {VotingEntity} from '../../../domain/entities/question.entity'
import {logger} from '../../../main/config/logger.config'
import {VotingModel} from '../../schemas/voting.schema'

export namespace Voting {
export const create = async (voting: VotingEntity) => {
	try {
		return VotingModel.create(voting)
	} catch (err) {
		logger.error((err as Error).message)
	}
}
}