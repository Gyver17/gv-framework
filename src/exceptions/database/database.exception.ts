import { HttpException } from '../http/http.exception';

export interface DatabaseExceptionConstructor {
	message: string;
	type: string;
	httpCode: number;
	field?: string;
}

export class DatabaseException extends HttpException {
	public readonly type: string;
	public readonly statusCode: number;
	public readonly field?: string;

	constructor({
		message,
		type,
		httpCode,
		field,
	}: DatabaseExceptionConstructor) {
		super(message, httpCode);
		this.type = type;
		this.statusCode = httpCode;
		this.field = field;
	}

	public toDbJSON() {
		return {
			...super.toJSON(),
			...(this.field && { field: this.field }),
			type: this.type,
		};
	}

	public toDbJSONApi() {
		return { errors: [this.toDbJSON()] };
	}
}
