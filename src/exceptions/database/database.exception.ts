import { HttpException } from '../http/http.exception';

export interface DatabaseExceptionConstructor {
	message: string;
	type: string;
	httpCode: number;
	field?: string;
}

/**
 * Custom class for HTTP exceptions from database.
 */
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

	/**
	 * Returns an object with information about the exception.
	 * @returns Object with the name, details, and status of the exception.
	 */
	public toDbJSON() {
		return {
			...super.toJSON(),
			...(this.field && { field: this.field }),
			type: this.type,
		};
	}

	/**
	 * Returns an object with an array that contains the result of the `toJSON` method.
	 * @returns Object with an array that contains the result of the `toJSON` method.
	 */
	public toDbJSONApi() {
		return { errors: [this.toDbJSON()] };
	}
}
