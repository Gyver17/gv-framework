import { Request, Response } from 'express';
import { HttpSuccessStatus } from '../../types';
import { Reject } from '../../router/utils';

export interface ControllerParams<T = undefined> {
	req: Request;
	res: Response;
	success(data: object, statusCode?: HttpSuccessStatus): void;
	reject: Reject;
	validate?: T extends undefined ? null : T;
	ownerId?: number;
}
