import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class PayloadTooLarge extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PAYLOAD_TOO_LARGE);
	}
}
