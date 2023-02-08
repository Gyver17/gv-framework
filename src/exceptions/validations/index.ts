import { ValidationError } from '@apideck/better-ajv-errors';
import { HttpStatus } from '../../enums';

export class ValidationException {
	statusCode: number;

	constructor(private readonly errors: ValidationError[]) {
		this.statusCode = 422;
	}

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

	public toJSONApi() {
		return { errors: this.toJSON() };
	}
}
