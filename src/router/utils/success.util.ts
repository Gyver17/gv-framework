import { Response } from 'express';
import { HttpStatus } from '../../enums';
import { HttpSuccessStatus } from '../../types';
import { autoBind } from '../../utils';

export class Success {
	private readonly res: Response;
	constructor(res: Response) {
		this.res = res;
		autoBind(this);
	}

	public response(
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
}
