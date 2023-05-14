import { Router, Request, Response, NextFunction } from 'express';
import { Route } from '../interfaces';
import { wrapperMiddleware, GvRequest, GvResponse } from './utils';

export function route({
	path,
	method,
	controller,
	router,
	middleware = [],
	disabled,
}: Route): Router {

	return router[method](
		path,
		wrapperMiddleware(middleware),
		async (req: Request, res: Response, next: NextFunction) => {
			const request = new GvRequest(req);
			const response = new GvResponse(res);

			const ownerId = req.ownerId;

			if (!disabled) {
				const handler = controller;

				if (typeof handler === 'function') {
					try {
						await controller({
							req: request.get(),
							res: response.get(),
							ownerId,
						});
					} catch (error) {
						next(error);
					}
				}
			}
		},
	);
}
