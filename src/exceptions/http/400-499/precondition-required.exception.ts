import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class PreconditionRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PRECONDITION_REQUIRED);
	}
}
