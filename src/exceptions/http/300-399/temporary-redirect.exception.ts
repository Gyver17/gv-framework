import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class TemporaryRedirect extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.TEMPORARY_REDIRECT);
	}
}
