import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class InsufficientStorage extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.INSUFFICIENT_STORAGE);
	}
}
