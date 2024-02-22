import Question from '../models/question.model'

export type QuestionsReturn = { body: { total: number, data: Question[] } }

export type QuestionWithPercentage = { body: { question: Question, yesVotesPercentage: number, noVotesPercentage: number } }
