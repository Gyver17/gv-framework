import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from '../interfaces';

export type Middleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => void | Promise<void>;

export type RouteMiddleware = Middleware | BaseMiddleware


