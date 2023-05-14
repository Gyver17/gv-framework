import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from '../../interfaces';
import { Middleware } from '../../types';
import { GvRequest } from './request.util';
import { GvResponse } from './response.util';

export function wrapperMiddleware(middlewares: BaseMiddleware[]): Middleware[] {
	const wrapped = middlewares.map((middleware) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const request = new GvRequest(req);
				const response = new GvResponse(res);
				await middleware.use(
					{
						req: request.get(),
						res: response.get(),
						ownerId: req.ownerId,
					},
					next,
				);
			} catch (error) {
				next(error);
			}
		};
	});

	return wrapped;
}
