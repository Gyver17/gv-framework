import { Request, Response, NextFunction } from 'express';
import { DatabaseException } from '../database';
import { HttpException, InternalServerError, SuccessException } from '../http';
import { ValidationException } from '../validations';

export function GlobalFilterExceptions(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(err);

	if (err instanceof SuccessException) {
		res.status(err.statusCode).json(err.response());
	}

	if (err instanceof ValidationException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	if (err instanceof DatabaseException) {
		res.status(err.statusCode).json(err.toDbJSONApi());
	}

	if (err instanceof HttpException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	const serverError = new InternalServerError('Something is Wrong');
	res.status(serverError.statusCode).json(serverError.toJSONApi());
}
