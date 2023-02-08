import { NextFunction } from 'express';
import { MiddlewareParams } from './middleware-params.interface';

export interface BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction): Promise<void> | void;
}
