import {
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault
} from 'fastify'
import {QuestionRoutes} from '../../presentation/routes/question.route'
import {Versioning} from './versioning.config'
import pino from 'pino'

export const RouteConfig = async (app: FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>) => {
	await app
		.register(QuestionRoutes, { prefix: Versioning.V1 })
}