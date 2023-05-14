import { Router, Request, Response, NextFunction } from 'express';
import { Route } from '../interfaces';
import { wrapperMiddleware, Success, Reject } from './utils';

export function route({
	path,
	method,
	controller,
	router,
	middleware = [],
	validation,
	disabled,
}: Route): Router {
	const request = controller;

	return router[method](
		path,
		wrapperMiddleware(middleware),
		async (req: Request, res: Response, next: NextFunction) => {
			const success = new Success(res);
			const reject = new Reject();
			const ownerId = req.ownerId;

			if (!disabled) {
				let validate = null;
				if (validation) {
					try {
						validate = await validation.validate({
							req,
							res,
							success: success.response,
							reject,
							ownerId,
						});
					} catch (error) {
						next(error);
					}
				}

				const handler = request;

				if (typeof handler === 'function') {
					try {
						await request({
							req,
							res,
							success: success.response,
							reject,
							validate,
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
