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
	badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	gone(message: string) {
		throw new Gone(message);
	}

	// 413
	payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}
}
