import {FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault} from 'fastify'
import pino from 'pino'
import fastifyCors from '@fastify/cors'

export const CorsConfig = async (app: FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    pino.Logger<never>
>) => {
	await app
		.register(fastifyCors, {
			origin: '*'
		})
}