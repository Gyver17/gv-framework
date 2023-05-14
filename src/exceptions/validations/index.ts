import { ZodIssue } from 'zod';
import { HttpStatus } from '../../enums';

/**
 * Custom class for HTTP exceptions from validations.
 */
export class ValidationException {
	statusCode: number;

	/**
	 * Constructor for the HttpException class.
	 * @param errors Error validations.
	 */
	constructor(private readonly errors: ZodIssue[]) {
		this.statusCode = 422;
	}

	/**
	 * returns an array of objects that contains information about each validation error.
	 * @returns Object with the name, details, and status of the exception.
	 */
	public toJSON() {
		return this.errors.map((error) => {
			const details = error.message;
			const type = error.code;
			const path = error.path;

			return {
				status: this.statusCode,
				name: HttpStatus[this.statusCode],
				details,
				type,
				field: path[0],
			};
		});
	}

	/**
	 * Returns an object with an array that contains the result of the `toJSON` method.
	 * @returns Object with an array that contains the result of the `toJSON` method.
	 */
	public toJSONApi() {
		return { errors: this.toJSON() };
	}
}
