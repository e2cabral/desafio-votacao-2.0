import {
	FastifyInstance,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault
} from 'fastify'
import {QuestionRoutes} from '../../presentation/routes/question.route'
import {Versioning} from './versioning.config'
import pino from 'pino'

export const RouteConfig = (app: FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>) => {
	app
		.register(QuestionRoutes, { prefix: Versioning.V1 })
}