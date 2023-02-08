import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class VariantAlsoNegotiates extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.VARIANT_ALSO_NEGOTIATES);
	}
}
