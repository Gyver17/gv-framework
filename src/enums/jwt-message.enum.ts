export enum JwtMessage {
	BAD = 'Cannot authorize the request due to a bad JWT implementation',
	INVALID = 'Cannot authorize the request, the given JWT is invalid',
	REQUIRED = 'Cannot authorize the request, because a JWT authorization was not specified'
}
