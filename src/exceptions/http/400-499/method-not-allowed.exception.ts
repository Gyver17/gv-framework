import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class MethodNotAllowed extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.METHOD_NOT_ALLOWED);
	}
}
