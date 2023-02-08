import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Ambiguous extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.AMBIGUOUS);
	}
}
