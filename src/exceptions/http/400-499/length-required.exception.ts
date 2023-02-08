import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class LengthRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.LENGTH_REQUIRED);
	}
}
