export class User {

	constructor (
		public firstName?: string,
    public lastName?: string,
		public email?: string,
		public password?: string,
    public passwordConfirm?: string,
    	public isEmployee?: boolean,
    	public employeePassword?: string
	) { }
}
