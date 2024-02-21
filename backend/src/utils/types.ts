import { JWT } from '@fastify/jwt'
import {UserEntity} from '../domain/entities/user.entity'

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT
    }
    export interface FastifyInstance {
        authenticate: any
    }
}


declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: Omit<UserEntity, 'name | phone | votes | questions'>
    }
}