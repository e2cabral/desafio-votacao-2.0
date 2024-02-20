import {QuestionModel} from '../../schemas/question.schema'
import QuestionEntity from '../../../domain/entities/question.entity'
import { logger } from '../../../main/config/logger.config'

export namespace Question {
	export const create = async (question: QuestionEntity) => {
		try {
			return QuestionModel.create(question)
		} catch (err) {
			logger.error((err as Error).message)
		}

	}
}