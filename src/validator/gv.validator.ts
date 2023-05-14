// @Libraries
import { Request } from 'express';
import { ZodIssue, ZodType, z } from 'zod';

// @Utils
import { autoBind } from '../utils';

// @Exceptions
import { ValidationException } from '../exceptions';

export class GvValidator {
	private request: Request;

	constructor(request: Request) {
		this.request = request;

		autoBind(this);
	}

	validate<T>(schema: ZodType<T>) {
		type type = z.infer<typeof schema>;
		const data = this.request.body;
		const validate = schema.safeParse(data);

		if (!validate.success) {
			const issues = validate.error.issues as ZodIssue[];
			throw new ValidationException(issues);
		}

		return data as type;
	}
}
