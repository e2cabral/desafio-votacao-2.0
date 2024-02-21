import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import {login} from '../controllers/auth/login'
import {register} from '../controllers/auth/register'

export const AuthRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/login',
			{
				schema: {
					tags: ['Auth']
				}
			},
			login
		)
		.post(
			'/register',
			{
				schema: {
					tags: ['Auth']
				}
			},
			register
		)

	done()
}