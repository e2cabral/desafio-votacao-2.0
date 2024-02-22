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
			credentials: true,
			origin: ['http://localhost:4200'],
			methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
			allowedHeaders: [
				'Content-Type',
				'Accept',
				'Authorization',
				'Host',
				'User-Agent',
				'Accept-Language',
				'Accept-Encoding',
				'Authorization',
				'Origin',
				'Connection',
				'Referer',
				'Sec-Fetch-Dest',
				'Sec-Fetch-Mode',
				'Sec-Fetch-Site',
			]
		})
}