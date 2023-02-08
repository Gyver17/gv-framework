import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class IAmATeapot extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.I_AM_A_TEAPOT);
	}
}
