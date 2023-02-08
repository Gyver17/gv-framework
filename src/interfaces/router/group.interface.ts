import { Router } from 'express';
import { BaseMiddleware } from '../middleware';
import { RouteParams } from './route-params.interface';

export interface GroupParams<T> {
	middleware?: BaseMiddleware[];
	prefix?: string;
	routes: RouteParams<T>[];
}

export interface Group<T> extends GroupParams<T> {
	router: Router;
	controller: T;
}
