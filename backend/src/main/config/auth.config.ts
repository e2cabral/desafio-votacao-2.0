import {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault
} from 'fastify'
import pino from 'pino'
import fastifyJwt, {FastifyJWT} from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const AuthConfig = async (app: FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    pino.Logger<never>
>) => {
	app
		.register(
			fastifyJwt,
			{ secret: String(process.env.JWT_SECRET) }
		)

	app.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
		request.jwt = app.jwt
		return next()
	})

	app.decorate(
		'authenticate',
		async (request: FastifyRequest, reply: FastifyReply) => {
			const token = request.cookies.access_token

			if (!token) {
				return reply
					.status(401)
					.send({ message: 'Authentication required' })
			}
			request.user = request
				.jwt
				.verify<FastifyJWT['user']>(token)
		}
	)

	app.register(fastifyCookie, {
		secret: String(process.env.JWT_SECRET),
		hook: 'onRequest',
	})
}