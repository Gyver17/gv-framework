import { HttpStatus } from '../../enums';

/**
 * Custom class for HTTP exceptions.
 */
export class HttpException extends Error {
	readonly statusCode: number;

	/**
	 * Constructor for the HttpException class.
	 * @param message Error message.
	 * @param statusCode HTTP status code.
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.name = HttpStatus[statusCode];
	}

	/**
	 * Returns an object with information about the exception.
	 * @returns Object with the name, details, and status of the exception.
	 */
	public toJSON() {
		return {
			name: this.name,
			details: this.message,
			status: this.statusCode,
		};
	}

	/**
	 * Returns an object with an array that contains the result of the `toJSON` method.
	 * @returns Object with an array that contains the result of the `toJSON` method.
	 */
	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}
