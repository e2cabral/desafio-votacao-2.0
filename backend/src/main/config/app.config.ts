import fastify, {FastifyInstance} from 'fastify'
import {QuestionRoutes} from '../../presentation/routes/question.route'

export const start = async () => {
	const app = await load()

	try {
		app
			.register(QuestionRoutes, { prefix: '/v1' })

		await listen(app)
	} catch (err) {
		app.log.error((err as Error).message)
	}
}

const listen = async (app: FastifyInstance): Promise<string> => {
	return app.listen({ port: 3000 })
}

const load = async (): Promise<FastifyInstance> => {
	return fastify()
}