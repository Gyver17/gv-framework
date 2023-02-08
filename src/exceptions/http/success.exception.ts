import { HttpException } from './http.exception';
import { HttpStatus } from '../../enums';
import { HttpSuccessStatus } from '../../types';

export class SuccessException extends HttpException {
	readonly data: Object;
	constructor(data: Object, statusCode: HttpSuccessStatus = '200') {
		super('success', parseInt(statusCode));
		this.data = data;
	}

	public response() {
		return {
			...super.toJSON(),
			data: this.data,
		};
	}
}
