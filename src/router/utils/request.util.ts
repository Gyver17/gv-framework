// @Libraries
import { Request as ExpressRequest } from 'express';
import { ZodIssue, ZodType, z } from 'zod';

// @Utils
import { autoBind } from '../../utils';

// @Interfaces
import { GvRequest as GvRequestInterface } from '../../interfaces';

// @Exceptions
import { ValidationException } from '../../exceptions';

export class GvRequest {
	private readonly request;

	constructor(request: ExpressRequest) {
		this.request = request;
		autoBind(this);
	}

	private isBoolean(value: unknown) {
		if (typeof value === 'boolean') return value;

		if (typeof value === 'string') {
			const toUpperCase = value.toUpperCase();
			const items = ['TRUE', 'FALSE'];
			if (items.includes(toUpperCase)) {
				return toUpperCase === 'TRUE';
			}
		}
	}

	private isUndefined(value: unknown) {
		if (value == 'undefined' || value === 'undefined') return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private isNumber(value: any) {
		if (!isNaN(value)) {
			return Number(value);
		}
	}

	private isArray(value: unknown) {
		if (Array.isArray(value)) return value;
	}

	private isString(value: unknown) {
		if (typeof value === 'string') return value;
	}

	private isDate(value: unknown) {
		if (typeof value === 'string') {
			const date = new Date(value);
			if (!isNaN(date.getTime())) {
				return date.toISOString();
			}
		}
	}

	private only<T = undefined>(fields: string[]) {
		if (!Array.isArray(fields)) {
			throw new Error('fields debe ser una matriz');
		}

		const object = fields.reduce((result, element) => {
			if (typeof element !== 'string') {
				throw new Error('Cada elemento de field debe ser una cadena');
			}
			result[element] = this.input(element) ?? undefined;
			return result;
		}, {} as Record<string, unknown>);

		return object as T extends undefined ? Record<string, unknown> : T;
	}

	private input(field: string) {
		const value: unknown =
			this.request.body[field] ?? this.request.query[field];

		return (
			this.isUndefined(value) ||
			this.isBoolean(value) ||
			this.isNumber(value) ||
			this.isArray(value) ||
			this.isDate(value) ||
			this.isString(value) ||
			value
		);
	}

	private fields() {
		return [
			...Object.keys(this.request.body),
			...Object.keys(this.request.query),
		];
	}

	private all() {
		return this.only(this.fields());
	}

	private validate<T>(
		schema: ZodType<T>,
		getData?: 'body' | 'query' | 'all',
	) {
		type typeData = z.infer<typeof schema>;
		const typeGet = getData ?? 'body';

		let data = {};
		if (typeGet === 'body') {
			data = this.request.body;
		} else if (typeGet === 'query') {
			data = this.request.query;
		} else {
			data = this.all();
		}

		const validate = schema.safeParse(data);

		if (!validate.success) {
			const issues = validate.error.issues as ZodIssue[];
			throw new ValidationException(issues);
		}

		return data as typeData;
	}

	get(): GvRequestInterface {
		this.request.input = this.input;
		this.request.only = this.only;
		this.request.all = this.all;
		this.request.fields = this.fields;
		this.request.validate = this.validate;

		return this.request;
	}
}
