import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Conflict extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.CONFLICT);
	}
}
