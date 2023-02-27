import { ValidationError } from '@apideck/better-ajv-errors';
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
	constructor(private readonly errors: ValidationError[]) {
		this.statusCode = 422;
	}

	/**
	 * returns an array of objects that contains information about each validation error.
	 * @returns Object with the name, details, and status of the exception.
	 */
	public toJSON() {
		return this.errors.map((error) => {
			const details = error.message;
			const type = error.context.errorType;
			const suggestion = error.suggestion;
			const path = error.path;

			if (type === 'required') {
				return {
					status: this.statusCode,
					name: HttpStatus[this.statusCode],
					details,
					type,
					suggestion,
					field: details.split(' ')[5]?.slice(1, -1) || path,
				};
			}

			return {
				status: this.statusCode,
				name: HttpStatus[this.statusCode],
				details,
				type,
				suggestion,
				field: error.path.split('.')[1],
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
