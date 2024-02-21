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
import {UserRoutes} from '../../presentation/routes/user.route'
import {VotingRoutes} from '../../presentation/routes/voting.route'
import {AuthRoutes} from '../../presentation/routes/auth.route'

export const RouteConfig = async (app: FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	pino.Logger<never>
>) => {
	await app
		.register(metrics, { endpoint: '/metrics' })
		.register(QuestionRoutes, { prefix: Versioning.V1 })
		.register(UserRoutes, { prefix: Versioning.V1 })
		.register(VotingRoutes, { prefix: Versioning.V1 })
		.register(AuthRoutes, { prefix: Versioning.V1 })
}