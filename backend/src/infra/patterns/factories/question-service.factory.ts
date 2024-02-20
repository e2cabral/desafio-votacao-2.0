import QuestionService from '../../../domain/services/question.service'

export const QuestionServiceFactory = () => {
	return new QuestionService()
}