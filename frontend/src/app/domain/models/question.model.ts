import {User} from './user.model'

export interface SessionTime {
  year: number
  month: number
  day: number
  hour: number
  minutes: number
  seconds: number
}

export interface Voting {
  _id: string
  userId: string
  answer: string
}

export default interface Question {
  _id?: string
  name: string,
  description: string,
  sessionTime: SessionTime,
  votes: Voting[] | string[],
  createdBy: User | string,
  sessionStartedDate: string
}
