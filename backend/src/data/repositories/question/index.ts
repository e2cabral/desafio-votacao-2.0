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

	export const findStarted = async (page: number, itemsPerPage: number) => {
		try {
			const validItemsPerPage = itemsPerPage ? itemsPerPage : 10

			const total = await QuestionModel.countDocuments({ sessionStartedDate: { $ne: null } })

			const data = await QuestionModel
				.find({ sessionStartedDate: { $ne: null } })
				.populate('createdBy')
				.populate('votes')
				.skip((page - 1) * validItemsPerPage)
				.limit(validItemsPerPage)

			return { data, total }
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findByCreator = (userId: string, page: number, itemsPerPage: number) => {
		try {
			const validItemsPerPage = itemsPerPage ? itemsPerPage : 10
			return QuestionModel
				.find({ createdBy: userId })
				.populate('votes')
				.skip((page - 1) * validItemsPerPage)
				.limit(validItemsPerPage)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findById = async (questionId: string) => {
		try {
			const question = await QuestionModel
				.findOne({ _id: questionId })
				.populate('votes')
				.populate('createdBy')
				.exec()

			if (question?.votes.length) {
				const yesVotes = question?.votes.filter((vote: any) => vote.answer === 'Sim').length
				const noVotes = question?.votes.filter((vote: any) => vote.answer === 'Não').length
				const totalVotes = yesVotes + noVotes

				const yesVotesPercentage = (yesVotes / totalVotes) * 100
				const noVotesPercentage = (noVotes / totalVotes) * 100

				return { question, yesVotesPercentage, noVotesPercentage }
			}

			return { question, yesVotesPercentage: 0, noVotesPercentage: 0 }
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}