import {QuestionModel} from '../../schemas/question.schema'
import QuestionEntity from '../../../domain/entities/question.entity'
import { logger } from '../../../main/config/logger.config'
import {UserModel} from '../../schemas/user.schema'

export namespace Question {
	export const create = async (question: QuestionEntity) => {
		try {
			const questionCreated = await QuestionModel.create(question)
			const user = await UserModel.findOne({ _id: question.createdBy })

			await user!.updateOne({ $push: { questions: questionCreated._id } })

			return questionCreated
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findOne = async (id: string) => {
		try {
			return QuestionModel.findOne({ _id: id })
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const startSession = async (sessionDate: string, id: string) => {
		try {
			return QuestionModel
				.updateOne({
					sessionStartedDate: sessionDate
				})
				.where({ _id: id })
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findStarted = (page: number, itemsPerPage: number) => {
		try {
			const validItemsPerPage = itemsPerPage ? itemsPerPage : 10
			return QuestionModel
				.find({ sessionStartedDate: { $ne: null } })
				.populate('createdBy')
				.skip((page - 1) * validItemsPerPage)
				.limit(validItemsPerPage)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}