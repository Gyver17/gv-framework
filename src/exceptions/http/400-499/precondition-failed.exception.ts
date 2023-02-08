import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class PreconditionFailed extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PRECONDITION_FAILED);
	}
}
