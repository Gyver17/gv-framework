import { Response } from 'express';
import { HttpStatus } from '../../enums';
import { HttpSuccessStatus } from '../../types';
import { autoBind } from '../../utils';
import {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	Conflict,
	Gone,
	PayloadTooLarge,
	UnprocessableEntity,
} from '../../exceptions';
import { GvResponse as GvResponseInterface } from '../../interfaces';

export class GvResponse {
	private readonly res: Response;
	constructor(res: Response) {
		this.res = res;
		autoBind(this);
	}

	// 400
	/**
	 * Throws a BadRequest exception with the specified message.
	 * This exception should be thrown when the client's request is incorrect or malformed.
	 * @param message Error message
	 */
	private badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	/**
	 * Throws an Unauthorized exception with the specified message.
	 * This exception should be thrown when the request requires authentication and the client has not provided valid credentials.
	 * @param message Error message
	 */
	private unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	/**
	 * Throws a Forbidden exception with the specified message.
	 * This exception should be thrown when the client does not have permission to access the requested resource.
	 * @param message Error message
	 */
	private forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	/**
	 * Throws a NotFound exception with the specified message.
	 * This exception should be thrown when the requested resource cannot be found.
	 * @param message Error message
	 */
	private notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	/**
	 * Throws a Conflict exception with the specified message.
	 * This exception should be thrown when the request conflicts with the current state of the server.
	 * @param message Error message
	 */
	private conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	/**
	 * Throws a Gone exception with the specified message.
	 * This exception should be thrown when the requested resource is no longer available and is not expected to be available again.
	 * @param message Error message
	 */
	private gone(message: string) {
		throw new Gone(message);
	}

	// 413
	/**
	 * Throws a PayloadTooLarge exception with the specified message.
	 * This exception should be thrown when the request payload is too large to be processed by the server.
	 * @param message Error message
	 */
	private payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	/**
	 * Throws an UnprocessableEntity exception with the specified message.
	 * This exception should be thrown when the request is semantically incorrect or cannot be processed.
	 * @param message Error message
	 */
	private unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}

	private success(
		data?: unknown,
		statusCode: HttpSuccessStatus = '200',
		additionalData?: unknown,
	) {
		if (typeof data !== 'object' || data === null)
			throw new Error('Data is not a valid object');

		if (
			typeof additionalData !== 'object' ||
			additionalData === null ||
			Array.isArray(additionalData)
		)
			throw new Error('additionalData is not a valid object');

		const code = parseInt(statusCode);
		this.res.status(code);
		this.res.json({
			message: HttpStatus[code] || 'OK',
			status: code,
			data,
			...additionalData,
		});
	}

	public get(): GvResponseInterface {
		this.res.badRequest = this.badRequest;
		this.res.unauthorized = this.unauthorized;
		this.res.forbidden = this.forbidden;
		this.res.notFound = this.notFound;
		this.res.conflict = this.conflict;
		this.res.gone = this.gone;
		this.res.payloadTooLarge = this.payloadTooLarge;
		this.res.unprocessableEntity = this.unprocessableEntity;
		this.res.success = this.success;

		return this.res;
	}
}
