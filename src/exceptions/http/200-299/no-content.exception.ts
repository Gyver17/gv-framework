import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class NoContent extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NO_CONTENT);
	}
}
