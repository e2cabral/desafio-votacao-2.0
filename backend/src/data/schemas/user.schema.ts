import mongoose, {Schema} from 'mongoose'
import {UserEntity} from '../../domain/entities/user.entity'
import bcrypt from 'bcrypt'

export const User = new Schema<UserEntity>({
	name: { type: 'String', required: true },
	email: { type: 'String', required: true },
	password: { type: 'String', required: true, select: false },
	phone: { type: 'String', required: true },
	votes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Voting', required: false }],
	questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Question', required: false }]
})

User.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
	}
	next()
})

export const UserModel = mongoose.model('User', User)