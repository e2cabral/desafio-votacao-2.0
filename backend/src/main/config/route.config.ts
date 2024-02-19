import {FastifyInstance} from 'fastify'
import {QuestionRoutes} from '../../presentation/routes/question.route'
import {Versioning} from './versioning.config'

export const RouteConfig = (app: FastifyInstance) => {
	app
		.register(QuestionRoutes, { prefix: Versioning.V1 })
}