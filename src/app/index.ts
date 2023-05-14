/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import { RequestHandler, RouteParameters } from 'express-serve-static-core';
import { GlobalFilterExceptions } from '../exceptions';
import { BaseGvRouter } from '../interfaces';

export class GvServer {
	app: Express;
	globalFilterExceptions: typeof GlobalFilterExceptions;

	constructor() {
		this.app = express();
		this.globalFilterExceptions = GlobalFilterExceptions;
	}

	private middlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
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
		this.middlewares();
		this.app.use(this.globalFilterExceptions);

		return this.app;
	}
}
