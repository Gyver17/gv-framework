import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class RequestHeaderFieldsTooLarge extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE);
	}
}
