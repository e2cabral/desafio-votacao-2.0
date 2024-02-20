import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import { create } from '../controllers/user/create'

export const UserRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/user',
			{
				schema: {
					tags: ['User']
				}
			},
			create
		)

	done()
}