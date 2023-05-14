import { Router } from 'express';
import { autoBind } from '../utils';
import { GroupParams, BaseGvRouter, RouteParams } from '../interfaces';
import { group } from './group.router';
import { route } from './route.router';

export class GvRouter implements BaseGvRouter {
	readonly methods: ['post', 'get', 'put', 'patch', 'delete'];
	public readonly router: Router;

	constructor() {
		this.router = Router();
		this.methods = ['post', 'get', 'put', 'patch', 'delete'];
		autoBind(this);
	}

	public route(params: RouteParams) {
		return route({
			...params,
			router: this.router,
		});
	}

	public group(params: GroupParams): Router {
		return group({
			...params,
			router: this.router,
		});
	}
}
