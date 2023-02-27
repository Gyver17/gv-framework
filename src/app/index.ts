import express, { Express, Router } from 'express';
import { RequestHandler, RouteParameters } from 'express-serve-static-core';
import { GlobalFilterExceptions } from '../exceptions';

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

	public loadRoutes(prefix: string, routes: Router[]) {
		for (const route of routes) {
			this.app.use(prefix, route);
		}
	}

	public create() {
		this.middlewares();
		this.app.use(this.globalFilterExceptions);
		
		return this.app;
	}
}
