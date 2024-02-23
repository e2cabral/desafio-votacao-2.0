import mongoose, {Schema} from 'mongoose'
import {VoterEntity, VotingEntity} from '../../domain/entities/voting.entity'

export const Voting = new Schema<VotingEntity>({
	cpf: { type: 'String', required: true },
	answer: { type: 'String', required: true }
})

export const VotingModel = mongoose.model('Voting', Voting)

export const Voter = new Schema<VoterEntity>({
	cpf: { type: 'String', required: true },
	name: { type: 'String', required: true }
})

export const VoterModel = mongoose.model('Voter', Voter)