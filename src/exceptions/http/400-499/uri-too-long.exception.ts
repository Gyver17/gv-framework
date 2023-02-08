import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class UriTooLong extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.URI_TOO_LONG);
	}
}
