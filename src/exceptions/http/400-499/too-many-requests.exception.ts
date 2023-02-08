import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class TooManyRequests extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.TOO_MANY_REQUESTS);
	}
}
