import {UserModel} from '../../schemas/user.schema'
import bcrypt from 'bcrypt'
import {FastifyRequest} from 'fastify'
import {UserEntity} from '../../../domain/entities/user.entity'
import {logger} from '../../../main/config/logger.config'

export namespace Auth {
export const login = async (email: string, password: string, request: FastifyRequest) => {
	const user = await UserModel.findOne({ email: email })

	if (!user) {
		throw new Error('User not found')
	}

	const validPassword = await bcrypt.compare(password, user.password)

	if (!validPassword) {
		throw new Error('Your email or password is invalid')
	}

	return request.jwt.sign({payload: { email: user.email, id: user._id }})
}

export const register = async (user: UserEntity) => {
	try {
		const isEmailRegistered = await UserModel.findOne({ email: user.email })
		if (isEmailRegistered) {
			throw new Error('Email already registered')
		}

		return UserModel.create(user)
	} catch (err) {
		const message = (err as Error).message
		logger.error(message)
		throw err
	}
}
}