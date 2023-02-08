import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Found extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.FOUND);
	}
}
