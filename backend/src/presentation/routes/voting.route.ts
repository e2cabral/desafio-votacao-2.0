import {FastifyInstance, RouteShorthandOptions} from 'fastify'
import {canVote, registerVoter, vote} from '../controllers/voting/vote'

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
		.post(
			'/vote/voter',
			{
				schema: {
					tags: ['Vote']
				}
			},
			registerVoter
		)
		.get(
			'/vote/voter/valid',
			{
				schema: {
					tags: ['Vote']
				}
			},
			canVote
		)

	done()
}