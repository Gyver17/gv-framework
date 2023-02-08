import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class RequestTimeout extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.REQUEST_TIMEOUT);
	}
}
