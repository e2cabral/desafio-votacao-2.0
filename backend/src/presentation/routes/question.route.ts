import {FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions} from 'fastify'

export const QuestionRoutes = (app: FastifyInstance, _: RouteShorthandOptions, done: () => void) => {
	app
		.post(
			'/question',
			{
				schema: {
					tags: ['Question']
				}
			},
			async (request: FastifyRequest, reply: FastifyReply) => {
				reply
					.status(200)
					.send({ message: 'question' })
			}
		)

	done()
}