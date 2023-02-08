import { Router } from 'express';
import { BaseMiddleware, BaseValidator } from '../../interfaces';
import { ExtractMethods, Method } from '../../types';

export interface RouteParams<T> {
	path: string;
	controllerMethod: keyof ExtractMethods<T>;
	method: Method;
	middleware?: BaseMiddleware[];
	validation?: BaseValidator;
	disabled?: boolean;
}

export interface Route<T> extends RouteParams<T> {
	router: Router;
	controller: T;
}
