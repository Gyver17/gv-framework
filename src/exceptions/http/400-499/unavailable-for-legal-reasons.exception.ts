import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class UnavailableForLegalReasons extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS);
	}
}
