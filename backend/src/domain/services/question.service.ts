import QuestionEntity, {SessionTime} from '../entities/question.entity'
import {Question} from '../../data/repositories/question'
import { logger } from '../../main/config/logger.config'

export default class QuestionService {
	async create(question: QuestionEntity) {
		try {
			return Question.create(question)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	async startSession(id: string) {
		const question = await Question.findOne(id)

		const today = new Date()
		const session: SessionTime = {
			year: today.getFullYear(),
			month: today.getMonth(),
			day: today.getDate(),
			hour: today.getHours(),
			minutes: today.getMinutes(),
			seconds: today.getSeconds(),
		}

		session.seconds += question!.sessionTime.seconds
		if (session.seconds >= 60) {
			session.minutes += Math.floor(session.seconds / 60)
			session.seconds %= 60
		}

		session.minutes += question!.sessionTime.minutes
		if (session.minutes >= 60) {
			session.hour += Math.floor(session.minutes / 60)
			session.minutes %= 60
		}

		session.hour += question!.sessionTime.hour
		if (session.hour >= 24) {
			session.day += Math.floor(session.hour / 24)
			session.hour %= 24
		}

		const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

		while (session.day > daysInMonth(session.year, session.month)) {
			session.day -= daysInMonth(session.year, session.month)
			session.month++
			if (session.month > 11) {
				session.month = 0
				session.year++
			}
		}

		const { year, month, day, hour, minutes, seconds } = session

		const dateFormated = new Date(
			year,
			month,
			day,
			hour,
			minutes,
			seconds
		).toLocaleDateString(
			'pt-br',
			{
				year:'numeric',
				month:'numeric',
				day:'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				dayPeriod: 'narrow'
			}
		)

		await Question.startSession(dateFormated, id)
	}

	async findStarted(page: number, itemsPerPage: number) {
		try {
			return Question.findStarted(page, itemsPerPage)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}