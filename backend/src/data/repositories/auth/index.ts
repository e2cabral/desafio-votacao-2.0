import {UserModel} from '../../schemas/user.schema'
import bcrypt from 'bcrypt'
import {FastifyInstance} from 'fastify'

export namespace Auth {
export const login = async (email: string, password: string, app: FastifyInstance) => {
	const user = await UserModel.findOne({ email: email })

	if (!user) {
		throw new Error('User not found')
	}

	const validPassword = await bcrypt.compare(password, user.password)

	if (!validPassword) {
		throw new Error('Your email or password is invalid')
	}

	return app.jwt.sign({payload: { email: user.email, id: user._id }})
}
}