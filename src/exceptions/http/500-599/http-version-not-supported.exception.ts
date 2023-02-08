import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class HttpVersionNotSupported extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
	}
}
