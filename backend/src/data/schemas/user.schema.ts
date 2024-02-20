import mongoose, {Schema} from 'mongoose'
import {UserEntity} from '../../domain/entities/user.entity'

export const User = new Schema<UserEntity>({
	name: { type: 'String', required: true },
	email: { type: 'String', required: true },
	phone: { type: 'String', required: true },
	votes: [{ type: mongoose.SchemaTypes.ObjectId, required: true }]
})

export const UserModel = new mongoose.Model('User', User)