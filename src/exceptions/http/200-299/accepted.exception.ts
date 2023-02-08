import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Accepted extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.ACCEPTED);
	}
}
