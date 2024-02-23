import {VotingEntity} from '../../entities/question.entity'
import {Voting} from '../../../data/repositories/voting'
import {logger} from '../../../main/config/logger.config'
import {VoterEntity} from '../../entities/voting.entity'
import {validateCPF} from '../../../utils/cpf-validation.util'

export namespace VotingService {
	export const vote = async (questionId: string, voting: VotingEntity) => {
		try {
			return Voting.vote(questionId, voting)
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}

	export const registerVoter = async (voter: VoterEntity) => {
		try {
			const isCpfValid = validateCPF(voter.cpf)

			if (!isCpfValid) throw new Error('CPF inválido')

			return Voting.registerVoter(voter)
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}

	export const canVote = async (cpf: string) => {
		try {
			return Voting.canVote(cpf)
		} catch (err) {
			const message = (err as Error).message
			logger.error(message)
			throw err
		}
	}
}