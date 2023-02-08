import { HttpStatus } from '../../../enums';
import { HttpException } from '../http.exception';

export class UpgradeRequired extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.UPGRADE_REQUIRED);
	}
}
