import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Continue extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.CONTINUE);
	}
}
