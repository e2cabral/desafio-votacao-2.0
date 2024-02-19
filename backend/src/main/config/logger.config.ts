import pino from 'pino'
import pretty from 'pino-pretty'

const prettier = pretty({
	colorize: true,
	colorizeObjects: true
})

const logger = pino({ level: 'info' }, prettier)

export const DefaultLogger = () => {
	return logger
}