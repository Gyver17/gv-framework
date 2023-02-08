import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class MovedPermanently extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.MOVED_PERMANENTLY);
	}
}
