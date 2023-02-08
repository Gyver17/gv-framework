import { Unauthorized } from '../http';
import { JwtMessage } from '../../enums';

export class RequiredJWT extends Unauthorized {
	constructor(message?: string) {
		super(message || JwtMessage.REQUIRED);
	}
}
