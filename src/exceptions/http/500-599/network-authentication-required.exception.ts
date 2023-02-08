import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class NetworkAuthenticationRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
	}
}
