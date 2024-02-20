import {VotingEntity} from '../entities/question.entity'
import {Voting} from '../../data/repositories/voting'
import {logger} from '../../main/config/logger.config'

export class VotingService {
	async vote(questionId: string, voting: VotingEntity) {
		try {
			return Voting.vote(questionId, voting)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}