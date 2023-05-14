import { Router } from 'express';
import { BaseMiddleware, BaseValidator } from '../../interfaces';
import { Controller, Method } from '../../types';

export interface RouteParams {
	path: string;
	// controllerMethod: keyof ExtractMethods<T>;
	controller: Controller;
	method: Method;
	middleware?: BaseMiddleware[];
	validation?: BaseValidator;
	disabled?: boolean;
}

export interface Route extends RouteParams {
	router: Router;
	controller: Controller;
}
