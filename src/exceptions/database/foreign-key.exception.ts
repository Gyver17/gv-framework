import { DatabaseException } from './database.exception';
import { TypeErrorDatabase, MessageErrorDatabase, HttpStatus } from '../../enums';

export class ForeingKeyException extends DatabaseException {
	constructor(message?: string) {
		super({
			type: TypeErrorDatabase.FOREIGN_KEY,
			message: message || MessageErrorDatabase.FOREIGN_KEY,
			httpCode: HttpStatus.CONFLICT,
		});
	}
}
