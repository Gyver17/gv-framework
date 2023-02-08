import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class UnprocessableEntity extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.UNPROCESSABLE_ENTITY);
	}
}
