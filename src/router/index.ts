import { Router } from 'express';
import { autoBind } from '../utils';
import { GroupParams, BaseGvRouter, RouteParams } from '../interfaces';
import { group } from './group.router';
import { route } from './route.router';

export class GvRouter<T> implements BaseGvRouter<T> {
	readonly methods: ['post', 'get', 'put', 'patch', 'delete'];
	public readonly router: Router;
	private readonly controller: T;

	constructor(controller: T) {
		this.controller = controller;
		this.router = Router();
		this.methods = ['post', 'get', 'put', 'patch', 'delete']
		autoBind(this);
	}

	public route(params: RouteParams<T>) {
		return route({
			...params,
			router: this.router,
			controller: this.controller,
		});
	}

	public group(params: GroupParams<T>): Router {
		return group<T>({
			...params,
			router: this.router,
			controller: this.controller,
		});
	}
}
