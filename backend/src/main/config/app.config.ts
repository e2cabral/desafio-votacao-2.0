import fastify, {
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault
} from 'fastify'
import {RouteConfig} from './route.config'
import {DefaultLogger} from './logger.config'
import pino from 'pino'

export const start = async () => {
	const app = await load()

	try {
		RouteConfig(app)

		await listen(app)
	} catch (err) {
		app.log.error((err as Error).message)
	}
}

const listen = async (app: FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>): Promise<string> => {
	return app.listen({ port: 3000 })
}

const load = async (): Promise<FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>> => {
	return fastify({
		logger: DefaultLogger()
	})
}