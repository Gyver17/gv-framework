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

	public response(data: object, statusCode: HttpSuccessStatus = '200') {
		const code = parseInt(statusCode);
		this.res.status(code);
		this.res.json({
			message: HttpStatus[code],
			status: code,
			data,
		});
	}
}
