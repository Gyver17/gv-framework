import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class PermanentRedirect extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PERMANENT_REDIRECT);
	}
}
