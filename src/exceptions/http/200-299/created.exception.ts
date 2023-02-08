import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class Created extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.CREATED);
	}
}
