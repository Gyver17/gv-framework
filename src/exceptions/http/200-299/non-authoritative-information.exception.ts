import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class NonAuthoritativeInformation extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
	}
}
