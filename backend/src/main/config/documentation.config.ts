import {FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault} from 'fastify'
import pino from 'pino'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const DocumentationConfig = async (app: FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    pino.Logger<never>
>) => {
	await app
		.register(fastifySwagger, {
			swagger: {
				info: {
					title: 'Pautas',
					description: 'Uma api para registrar suas pautas',
					version: '1.0.0'
				},
				externalDocs: {
					url: 'https://swagger.io',
					description: 'Find more info here'
				},
				host: 'localhost',
				schemes: ['http'],
				consumes: ['application/json'],
				produces: ['application/json']
			}
		})
		.register(fastifySwaggerUi, {
			routePrefix: '/docs',
			uiConfig: {
				docExpansion: 'full',
				deepLinking: false
			},
			staticCSP: true,
			transformStaticCSP: (header: unknown) => header,
			transformSpecification: (swaggerObject: unknown) => { return swaggerObject },
			transformSpecificationClone: true
		})
}