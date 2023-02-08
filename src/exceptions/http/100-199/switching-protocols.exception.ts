import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class SwitchingProtocols extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.SWITCHING_PROTOCOLS);
	}
}