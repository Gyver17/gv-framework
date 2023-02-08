import { HttpStatus } from '../../enums';

export class HttpException extends Error {
	readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.name = HttpStatus[statusCode];
	}

	public toJSON() {
		return {
			name: this.name,
			details: this.message,
			status: this.statusCode,
		};
	}

	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}
