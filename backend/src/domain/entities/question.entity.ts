import mongoose from 'mongoose'

export interface SessionTime {
    year: number
    month: number
    day: number
    hour: number
    minutes: number
    seconds: number
}

export interface VotingEntity {
    userId: mongoose.ObjectId
    questionId: mongoose.ObjectId
    answer: string
}

export default interface QuestionEntity {
    name: string,
    description: string,
    sessionTime: SessionTime,
    votes: mongoose.ObjectId[],
    sessionStartedDate: Date
}