import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class ResetContent extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.RESET_CONTENT);
	}
}
