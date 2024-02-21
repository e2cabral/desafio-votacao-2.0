import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { create } from '../controllers/question/create'
import {startSession} from '../controllers/question/start-session'
import {findStarted} from '../controllers/question/find-started'

export const QuestionRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/question',
			{ onRequest: app.authenticate, schema: { tags: ['Question'] } },
			create
		)
		.patch(
			'/question/start/:id',
			{
				onRequest: app.authenticate,
				schema: {
					tags: ['Question']
				}
			},
			startSession
		)
		.get(
			'/question/started',
			{
				onRequest: app.authenticate,
				schema: {
					querystring: {
						page: { type: 'number' },
						itemsPerPage: { type: 'number' },
					},
					tags: ['Question']
				}
			},
			findStarted
		)

	done()
}