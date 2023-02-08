import { Router } from 'express';
import { Group } from '../interfaces';
import { route } from './route.router';

export function group<T>({
	middleware = [],
	prefix = '/',
	routes,
	router,
	controller,
}: Group<T>): Router {
	routes.map(
		({
			path,
			middleware: routeMiddleware = [],
			method,
			controllerMethod,
			validation,
		}) => {
			const routePath = prefix === '/' ? path : prefix + path;

			route({
				path: routePath,
				middleware: [...middleware, ...routeMiddleware],
				method,
				controllerMethod,
				validation,
				router,
				controller,
			});
		},
	);

	return router;
}
