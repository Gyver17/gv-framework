import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class ExpectationFailed extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.EXPECTATION_FAILED);
	}
}
