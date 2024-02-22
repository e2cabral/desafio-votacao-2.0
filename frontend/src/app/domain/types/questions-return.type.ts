import Question from '../models/question.model'

export type QuestionsReturn = { body: { total: number, data: Question[] } }
