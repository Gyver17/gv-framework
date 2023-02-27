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

export class Reject {
	// 400
	/**
	 * Throws a BadRequest exception with the specified message.
	 * This exception should be thrown when the client's request is incorrect or malformed.
	 * @param message Error message
	 */
	badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	/**
	 * Throws an Unauthorized exception with the specified message.
	 * This exception should be thrown when the request requires authentication and the client has not provided valid credentials.
	 * @param message Error message
	 */
	unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	/**
	 * Throws a Forbidden exception with the specified message.
	 * This exception should be thrown when the client does not have permission to access the requested resource.
	 * @param message Error message
	 */
	forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	/**
	 * Throws a NotFound exception with the specified message.
	 * This exception should be thrown when the requested resource cannot be found.
	 * @param message Error message
	 */
	notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	/**
	 * Throws a Conflict exception with the specified message.
	 * This exception should be thrown when the request conflicts with the current state of the server.
	 * @param message Error message
	 */
	conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	/**
	 * Throws a Gone exception with the specified message.
	 * This exception should be thrown when the requested resource is no longer available and is not expected to be available again.
	 * @param message Error message
	 */
	gone(message: string) {
		throw new Gone(message);
	}

	// 413
	/**
	 * Throws a PayloadTooLarge exception with the specified message.
	 * This exception should be thrown when the request payload is too large to be processed by the server.
	 * @param message Error message
	 */
	payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	/**
	 * Throws an UnprocessableEntity exception with the specified message.
	 * This exception should be thrown when the request is semantically incorrect or cannot be processed.
	 * @param message Error message
	 */
	unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}
}
