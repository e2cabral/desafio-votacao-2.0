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
    cpf: string
    answer: string
}

export default interface QuestionEntity {
    name: string,
    description: string,
    sessionTime: SessionTime,
    votes: mongoose.ObjectId[],
    createdBy: mongoose.ObjectId
    sessionStartedDate: string
}