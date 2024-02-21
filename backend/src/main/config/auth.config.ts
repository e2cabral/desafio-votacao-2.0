import {FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault} from 'fastify'
import pino from 'pino'
import fastifyJwt from '@fastify/jwt'

export const AuthConfig = async (app: FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    pino.Logger<never>
>) => {
	app
		.register(fastifyJwt, { secret: String(process.env.JWT_SECRET) })
}