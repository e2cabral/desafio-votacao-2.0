export class User {
	constructor (
    public _id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public votes: string[],
    public questions: string[]
	) {}
}
