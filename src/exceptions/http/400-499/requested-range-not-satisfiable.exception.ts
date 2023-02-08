import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class RequestedRangeNotSatisfiable extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE);
	}
}
