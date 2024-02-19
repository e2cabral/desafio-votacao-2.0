import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

const app: FastifyInstance = fastify()

app.get(
    '/',
    {},
    (request: FastifyRequest, reply: FastifyReply) => {
        reply.status(200).send({ message: 'Hello, World' })
    })