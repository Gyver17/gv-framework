import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class UnsupportedMediaType extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
	}
}
