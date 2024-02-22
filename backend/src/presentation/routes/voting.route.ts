import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import {vote} from '../controllers/voting/vote'

export const VotingRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/vote/:questionId',
			{
				schema: {
					tags: ['Vote']
				}
			},
			vote
		)

	done()
}