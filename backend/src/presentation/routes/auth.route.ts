import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import {login} from '../controllers/auth/login'

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

	done()
}