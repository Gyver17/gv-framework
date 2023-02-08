import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class EarlyHints extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.EARLY_HINTS);
	}
}
