import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { create } from '../controllers/question/create'
import {startSession} from '../controllers/question/start-session'
import {findStarted} from '../controllers/question/find-started'

export const QuestionRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/question',
			{ schema: { tags: ['Question'] } },
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
		.get(
			'/question/started',
			{
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