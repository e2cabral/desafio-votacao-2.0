import mongoose from 'mongoose'

export interface UserEntity {
    name: string
    email: string
    password: string
    phone: string
    votes: mongoose.ObjectId[]
    questions: mongoose.ObjectId[]
}