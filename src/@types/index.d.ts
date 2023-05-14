declare namespace Express {
	export interface Request {
		ownerId?: number;
		input: (field: string) => unknown;
		only: <T = undefined>(
			fields: string[],
		) => T extends undefined ? Record<string, unknown> : T;
		all: () => Record<string, unknown>;
		fields: () => string[];
	}

	export interface Response {
		badRequest(message: string): void;
		unauthorized(message: string): void;
		forbidden(message: string): void;
		notFound(message: string): void;
		conflict(message: string): void;
		gone(message: string): void;
		payloadTooLarge(message: string): void;
		unprocessableEntity(message: string): void
		unprocessableEntity(message: string): void
		success(
			data?: unknown,
			statusCode?: HttpSuccessStatus,
			additionalData?: unknown,
		): void;
	}
}
