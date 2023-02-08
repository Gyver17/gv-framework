import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Forbidden extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.FORBIDDEN);
	}
}
