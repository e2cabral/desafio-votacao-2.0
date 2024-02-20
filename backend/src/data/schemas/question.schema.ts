import mongoose, { Schema } from 'mongoose'
import QuestionEntity from '../../domain/entities/question.entity'

export const Question = new Schema<QuestionEntity>({
	name: { type: 'String', required: true},
	description: { type: 'String', required: true},
	sessionTime: {
		type: mongoose.SchemaTypes.Mixed,
		required: true
	},
	votes: [mongoose.SchemaTypes.ObjectId],
	sessionStartedDate: { type: 'Date', required: false }
})

export const QuestionModel = new mongoose.Model('Question', Question)