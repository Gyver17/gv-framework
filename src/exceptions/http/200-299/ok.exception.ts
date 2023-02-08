import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Ok extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.OK);
	}
}
