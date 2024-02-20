import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { create } from '../controllers/question/create'

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

	done()
}