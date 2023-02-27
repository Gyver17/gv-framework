import { Router } from 'express';
import { GroupParams } from './group.interface';
import { RouteParams } from './route-params.interface';

export interface BaseGvRouter<T = unknown> {
	methods: ['post', 'get', 'put', 'patch', 'delete'];
	router: Router;
	route(params: RouteParams<T>): Router;
	group(params: GroupParams<T>): Router;
}
