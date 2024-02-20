import * as mongoose from 'mongoose'

export default class Database {
	static async connect() {
		return mongoose
			.connect(
				`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`,
				{
					auth: {
						username: process.env.MONGO_USER,
						password: process.env.MONGO_PASSWORD
					},
					authSource: 'admin'
				}
			)
	}
}