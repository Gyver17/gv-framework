import { Request, Response } from 'express';
import { Reject } from '../../router/utils';

export interface MiddlewareParams {
	req: Request;
	res: Response;
	reject: Reject;
	ownerId?: number;
}
