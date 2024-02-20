import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { create } from '../controllers/question/create'
import {startSession} from '../controllers/question/start-session'

export const QuestionRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/question',
			{
				schema: {
					tags: ['Question']
				}
			},
			create
		)
		.patch(
			'/question/start/:id',
			{
				schema: {
					tags: ['Question']
				}
			},
			startSession
		)

	done()
}