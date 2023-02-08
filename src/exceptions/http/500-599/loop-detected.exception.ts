import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class LoopDetected extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.LOOP_DETECTED);
	}
}
