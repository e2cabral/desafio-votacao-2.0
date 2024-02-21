import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from 'fastify'
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
			async (request: FastifyRequest, reply: FastifyReply) => await login(request, reply, app)
		)

	done()
}