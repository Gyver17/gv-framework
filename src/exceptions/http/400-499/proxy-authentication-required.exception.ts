import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class ProxyAuthenticationRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
	}
}
