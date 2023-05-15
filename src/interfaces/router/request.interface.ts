import { Request as ExpressRequest } from 'express';
import { ZodType } from 'zod';

export interface GvRequest extends ExpressRequest {
	input<T = undefined>(
		field: string,
		defaultValue?: T extends undefined ? unknown : T,
	): T extends undefined ? unknown : T;
	only: <T = undefined>(
		fields: string[],
	) => T extends undefined ? Record<string, unknown> : T;
	all: () => Record<string, unknown>;
	fields: () => string[];
	validate<T>(
		schema: ZodType<T>,
		getData?: 'body' | 'query' | 'all' | 'params',
	): T;
}
