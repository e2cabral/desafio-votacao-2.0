export class DaysPerMonth {
	static january = { key: 0, max: 31 }
	static february = { key: 1, max: 28 }
	static march = { key: 2, max: 31 }
	static april = { key: 3, max: 30 }
	static may = { key: 4, max: 31 }
	static june = { key: 5, max: 30 }
	static july = { key: 6, max: 31 }
	static august = { key: 7, max: 31 }
	static september = { key: 8, max: 30 }
	static october = { key: 9, max: 31 }
	static november = { key: 10, max: 30 }
	static december = { key: 11, max: 31 }

	static getMonth(key: number) {
		return [
			this.january, this.february,
			this.march, this.april,
			this.may, this.june,
			this.july, this.august,
			this.september, this.october,
			this.november, this.december
		].find(month => month.key === key)
	}
}

const isLeapYear = (year: number): boolean => {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}