import mongoose, {Schema} from 'mongoose'
import {VotingEntity} from '../../domain/entities/question.entity'

export const Voting = new Schema<VotingEntity>({
	userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
	questionId: { type: mongoose.SchemaTypes.ObjectId, required: true },
	answer: { type: 'String', required: true }
})

export const VotingModel = new mongoose.Model('Voting', Voting)