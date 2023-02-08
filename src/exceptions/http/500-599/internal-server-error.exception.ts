import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class InternalServerError extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
