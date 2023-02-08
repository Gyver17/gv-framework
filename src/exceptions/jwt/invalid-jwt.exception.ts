import { Unauthorized } from '../http';
import { JwtMessage } from '../../enums';

export class InvalidJWT extends Unauthorized {
	constructor(message?: string) {
		super(message || JwtMessage.INVALID);
	}
}
