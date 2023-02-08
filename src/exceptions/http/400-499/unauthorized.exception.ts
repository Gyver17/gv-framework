import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Unauthorized extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.UNAUTHORIZED);
	}
}
