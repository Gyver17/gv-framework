import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class SeeOther extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.SEE_OTHER);
	}
}
