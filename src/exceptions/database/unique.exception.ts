import { DatabaseException } from './database.exception';
import { TypeErrorDatabase, MessageErrorDatabase, HttpStatus } from '../../enums';

export class UniqueException extends DatabaseException {
	constructor(field: string, message?: string) {
		super({
			type: TypeErrorDatabase.UNIQUE,
			message: message || MessageErrorDatabase.UNIQUE,
			httpCode: HttpStatus.CONFLICT,
			field,
		});
	}
}
