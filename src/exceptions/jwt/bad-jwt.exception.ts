import { BadRequest } from '../http';
import { JwtMessage } from '../../enums';

export class BadJWT extends BadRequest {
	constructor(message?: string) {
		super(message || JwtMessage.BAD);
	}
}
