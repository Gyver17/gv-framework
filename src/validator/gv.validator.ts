// @Libraries
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { betterAjvErrors } from '@apideck/better-ajv-errors';
import type { JSONSchema6 } from 'json-schema';

// @Interfaces
import { BaseValidator } from '../interfaces';
import { ValidateParams } from '../interfaces/validator/validate-params.interface';

// @Utils
import { autoBind } from '../utils';

// @Exceptions
import { ValidationException } from '../exceptions';

export class GvValidator<T> implements BaseValidator {
	private ajv: Ajv;

	constructor(private readonly schema: JSONSchemaType<T>) {
		this.ajv = addFormats(new Ajv({ allErrors: true }));
		autoBind(this);
	}

	validate({ req, res }: ValidateParams): T {
		const validate = this.ajv.compile(this.schema);
		const data = req.body as T;
		validate(data);

		if (validate.errors) {
			const schema = this.schema as JSONSchema6;
			const errors = betterAjvErrors({
				errors: validate.errors,
				data,
				schema,
				basePath: 'request',
			});

			throw new ValidationException(errors);
		}

		return data;
	}
}
