import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from '../../interfaces';
import { Middleware } from '../../types';
import { Reject } from './reject.util';

export function wrapperMiddleware(middlewares: BaseMiddleware[]): Middleware[] {
	const wrapped = middlewares.map((middleware) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				await middleware.use(
					{ req, res, reject: new Reject(), ownerId: req.ownerId },
					next,
				);
			} catch (error) {
				next(error);
			}
		};
	});

	return wrapped;
}
