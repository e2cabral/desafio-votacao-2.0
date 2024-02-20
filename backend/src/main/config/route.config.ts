import {
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault
} from 'fastify'
import {QuestionRoutes} from '../../presentation/routes/question.route'
import {Versioning} from './versioning.config'
import pino from 'pino'
import metrics from 'fastify-metrics'

export const RouteConfig = async (app: FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>) => {
	await app
		.register(metrics, { endpoint: '/metrics' })
		.register(QuestionRoutes, { prefix: Versioning.V1 })
}