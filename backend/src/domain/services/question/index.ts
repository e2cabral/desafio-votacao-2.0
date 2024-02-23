import QuestionEntity, {SessionTime} from '../../entities/question.entity'
import {Question} from '../../../data/repositories/question'
import { logger } from '../../../main/config/logger.config'
import {DaysPerMonth} from '../../../presentation/helpers/date.helper'

export namespace QuestionService {
	export const create = async (question: QuestionEntity)=> {
		try {
			return Question.create(question)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const startSession = async (id: string)=> {
		const question = await Question.findOne(id)

		if (question!.sessionStartedDate) {
			throw new Error('The session of this question has already started.')
		}

		const today = new Date()
		const session: SessionTime = {
			year: today.getFullYear(),
			month: today.getMonth(),
			day: today.getDate(),
			hour: today.getHours(),
			minutes: today.getMinutes(),
			seconds: today.getSeconds(),
		}

		if (
			!session.year &&
			!session.month &&
			!session.day &&
			!session.hour &&
			!session.minutes &&
			!session.seconds
		) {
			session.minutes = 1
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

		session.day += question!.sessionTime.day
		if (session.day >= DaysPerMonth.getMonth(session.month)!.max) {
			session.month += 1
			session.day = 1
			if (session.month >= 12) {
				session.year += 1
				session.month = 0
			}
		}

		session.month += question!.sessionTime.month
		if (session.month >= 12) {
			session.year += Math.floor(session.month / 12)
			session.month %= 12
		}

		session.year += question!.sessionTime.year

		const { year, month, day, hour, minutes, seconds } = session

		const dateFormatted = new Date(
			year,
			month,
			day,
			hour,
			minutes,
			seconds
		).toLocaleDateString(
			'en-US',
			{
				year:'numeric',
				month:'numeric',
				day:'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true
			}
		)

		await Question.startSession(dateFormatted, id)
	}

	export const findStarted = async (page: number, itemsPerPage: number)=> {
		try {
			return Question.findStarted(page, itemsPerPage)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findByCreator = async (userId: string, page: number, itemsPerPage: number)=> {
		try {
			return Question.findByCreator(userId, page, itemsPerPage)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}

	export const findById = async (questionId: string)=> {
		try {
			return Question.findById(questionId)
		} catch (err) {
			logger.error((err as Error).message)
		}
	}
}