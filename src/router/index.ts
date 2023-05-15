import { Router } from 'express';
import { autoBind } from '../utils';
import {
	GroupParams,
	BaseGvRouter,
	RouteParams,
	BaseMiddleware,
} from '../interfaces';
import { group } from './group.router';
import { route } from './route.router';

export class GvRouter implements BaseGvRouter {
	// private readonly methods: ['post', 'get', 'put', 'patch', 'delete'];
	public readonly router: Router;
	private path: string;
	private readonly middlewares: BaseMiddleware[];

	constructor() {
		this.router = Router();
		this.path = '/';
		this.middlewares = [];
		// this.methods = ['post', 'get', 'put', 'patch', 'delete'];
		autoBind(this);
	}

	public use(middleware: BaseMiddleware | BaseMiddleware[]) {
		if (Array.isArray(middleware)) {
			this.middlewares.push(...middleware);
		} else {
			this.middlewares.push(middleware);
		}
	}

	public prefix(path: string) {
		this.path = path;
	}

	public route({ path = '/', ...params }: RouteParams) {
		return route({
			...params,
			path: this.path === '/' ? path : this.path + path,
			middleware: [...this.middlewares, ...(params.middleware || [])],
			router: this.router,
		});
	}

	public group(params: GroupParams): Router {
		return group({
			...params,
			prefix:
				this.path === '/' ? params.prefix : this.path + params.prefix,
			middleware: [...this.middlewares, ...(params.middleware || [])],
			router: this.router,
		});
	}
}
