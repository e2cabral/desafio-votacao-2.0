declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_HOST: string
            MONGO_DATABASE: string
            MONGO_USER: string
            MONGO_PASSWORD: string
        }
    }
}

export {}