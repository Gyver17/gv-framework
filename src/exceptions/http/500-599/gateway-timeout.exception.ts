import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class GatewayTimeout extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.GATEWAY_TIMEOUT);
	}
}
