import { Router } from 'express';
import { GroupParams } from './group.interface';
import { RouteParams } from './route-params.interface';

export interface BaseGvRouter {
	methods: ['post', 'get', 'put', 'patch', 'delete'];
	route(params: RouteParams): Router;
	group(params: GroupParams): Router;
	router: Router;
}
