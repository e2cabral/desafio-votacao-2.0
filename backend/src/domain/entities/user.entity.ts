import mongoose from 'mongoose'

export interface UserEntity {
    name: string
    email: string
    phone: string
    votes: mongoose.ObjectId[]
}