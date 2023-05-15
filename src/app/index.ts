/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express, json, urlencoded } from 'express';
import { RequestHandler, RouteParameters } from 'express-serve-static-core';
import { GlobalFilterExceptions } from '../exceptions';
import { BaseGvRouter } from '../interfaces';
import { autoBind } from '../utils';

export class GvServer {
	app: Express;
	globalFilterExceptions: typeof GlobalFilterExceptions;

	constructor() {
		this.app = express();
		this.globalFilterExceptions = GlobalFilterExceptions;
		this.middlewares();
		autoBind(this);
	}

	private middlewares() {
		this.app.use(urlencoded({ extended: true }));
		this.app.use(json());
	}

	public useGlobalFilters(filter: typeof GlobalFilterExceptions) {
		this.globalFilterExceptions = filter;
	}

	public engine(
		ext: string,
		fn: (
			path: string,
			options: object,
			callback: (e: any, rendered?: string) => void,
		) => void,
	) {
		this.app.engine(ext, fn);
	}

	public use<Route extends string = string>(
		middleware: Array<RequestHandler<RouteParameters<Route>>>,
	) {
		this.app.use(middleware);
	}

	public set(setting: string, val: any) {
		this.app.set(setting, val);
	}

	public loadRoutes(prefix: string, routes: BaseGvRouter[]) {
		for (const route of routes) {
			if (!route?.router) throw new Error('route invalid');

			this.app.use(prefix, route.router);
		}
	}

	public create() {
		this.app.use(this.globalFilterExceptions);

		return this.app;
	}
}
