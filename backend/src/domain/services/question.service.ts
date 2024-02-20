import QuestionEntity from '../entities/question.entity'
import {Question} from '../../data/repositories/question/create'
import { logger } from '../../main/config/logger.config'

export default class QuestionService {
	async create(question: QuestionEntity) {
		try {
			return Question.create(question)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}