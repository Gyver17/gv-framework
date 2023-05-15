import { Router } from 'express';
import { BaseMiddleware } from '../../interfaces';
import { Controller, Method } from '../../types';

export interface RouteParams {
	path?: string;
	controller: Controller;
	method: Method;
	middleware?: BaseMiddleware[];
	disabled?: boolean;
}

export interface Route extends RouteParams {
	router: Router;
	controller: Controller;
}
