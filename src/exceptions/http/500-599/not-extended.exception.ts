import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class NotExtended extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NOT_EXTENDED);
	}
}
