import { Router } from 'express';
import { Group } from '../interfaces';
import { route } from './route.router';

export function group({
	middleware = [],
	prefix = '/',
	routes,
	router,
}: Group): Router {
	routes.map(
		({
			path,
			middleware: routeMiddleware = [],
			method,
			validation,
			controller,
		}) => {
			const routePath = prefix === '/' ? path : prefix + path;

			route({
				path: routePath,
				middleware: [...middleware, ...routeMiddleware],
				method,
				validation,
				router,
				controller,
			});
		},
	);

	return router;
}
