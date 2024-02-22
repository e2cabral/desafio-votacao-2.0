import mongoose, {Schema} from 'mongoose'
import {VotingEntity} from '../../domain/entities/question.entity'

export const Voting = new Schema<VotingEntity>({
	cpf: { type: 'String', required: true },
	answer: { type: 'String', required: true }
})

export const VotingModel = mongoose.model('Voting', Voting)