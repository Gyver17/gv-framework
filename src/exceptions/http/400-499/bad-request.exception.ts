import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class BadRequest extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
