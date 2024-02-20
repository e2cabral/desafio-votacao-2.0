import mongoose, { Schema } from 'mongoose'
import QuestionEntity from '../../domain/entities/question.entity'

export const Question = new Schema<QuestionEntity>({
	name: { type: 'String', required: true},
	description: { type: 'String', required: true},
	sessionTime: {
		type: mongoose.SchemaTypes.Mixed,
		required: true
	},
	votes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Voting' }],
	createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
	sessionStartedDate: { type: 'String', required: false }
})

export const QuestionModel = mongoose.model('Question', Question)