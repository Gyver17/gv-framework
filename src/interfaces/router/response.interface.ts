import { Response as ExpressResponse } from 'express';
import { HttpSuccessStatus } from '../../types';

export interface GvResponse extends ExpressResponse {
	badRequest(message: string): void;
	unauthorized(message: string): void;
	forbidden(message: string): void;
	notFound(message: string): void;
	conflict(message: string): void;
	gone(message: string): void;
	payloadTooLarge(message: string): void;
	unprocessableEntity(message: string): void;
	unprocessableEntity(message: string): void;
	success(
		data?: unknown,
		statusCode?: HttpSuccessStatus,
		additionalData?: unknown,
	): void;
}
