import {VotingService} from '../../../domain/services/voting.service'

export const VotingServiceFactory = () => {
	return new VotingService()
}