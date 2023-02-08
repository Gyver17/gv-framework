import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class PaymentRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PAYMENT_REQUIRED);
	}
}
