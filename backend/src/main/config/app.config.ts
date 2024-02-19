import fastify, {FastifyInstance} from 'fastify'

export const start = async () => {
	const app = await load()

	try {
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