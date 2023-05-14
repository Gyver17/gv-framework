import { Router } from 'express';
import { BaseMiddleware } from '../middleware';
import { RouteParams } from './route-params.interface';

export interface GroupParams {
	middleware?: BaseMiddleware[];
	prefix?: string;
	routes: RouteParams[];
}

export interface Group extends GroupParams {
	router: Router;
	// controller: T;
}
