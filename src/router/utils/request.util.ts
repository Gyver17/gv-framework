import { Request as ExpressRequest } from 'express';
import { autoBind } from '../../utils';
import { GvRequest as GvRequestInterface } from '../../interfaces';
import { GvValidator } from '../../validator';

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

	get(): GvRequestInterface {
		this.request.input = this.input;
		this.request.only = this.only;
		this.request.all = this.all;
		this.request.fields = this.fields;
		this.request.validate = new GvValidator(this.request).validate;

		return this.request;
	}
}
