import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class ServiceUnavailable extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.SERVICE_UNAVAILABLE);
	}
}
