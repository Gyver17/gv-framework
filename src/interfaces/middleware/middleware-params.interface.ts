import { GvRequest, GvResponse } from '../router';

export interface MiddlewareParams {
	req: GvRequest;
	res: GvResponse;
	ownerId?: number;
}
