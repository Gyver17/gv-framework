import { GvRequest, GvResponse } from '../router';

export interface ControllerParams {
	req: GvRequest;
	res: GvResponse;
	ownerId?: number;
}
