import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class NotAcceptable extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NOT_ACCEPTABLE);
	}
}
