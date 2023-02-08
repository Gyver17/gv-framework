import { Request, Response } from 'express';
import { Reject } from '../../router/utils';
import { HttpSuccessStatus } from '../../types';

export interface ValidateParams {
	req: Request;
	res: Response;
	success(data: object, statusCode?: HttpSuccessStatus): void;
	reject: Reject;
	ownerId?: number;
}
