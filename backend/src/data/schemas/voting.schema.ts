import mongoose, {Schema} from 'mongoose'
import {VotingEntity} from '../../domain/entities/question.entity'

export const Voting = new Schema<VotingEntity>({
	userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
	answer: { type: 'String', required: true }
})

export const VotingModel = mongoose.model('Voting', Voting)