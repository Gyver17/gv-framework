import { NextFunction } from 'express';
import { BaseMiddleware, MiddlewareParams } from '../../interfaces';
import { Middleware } from '../../types';
import { autoBind } from '../../utils';

export class JWTMiddleware implements BaseMiddleware {
	constructor(private readonly middleware: Middleware) {
		autoBind(this);
	}

	async use(context: MiddlewareParams, next: NextFunction): Promise<void> {
		await this.middleware(context.req, context.res, next);
	}
}
