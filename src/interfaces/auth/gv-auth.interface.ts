import {
	CreateMethod,
	DataRegister,
	FindMethod,
	HashPassword,
	MatchPassword,
	ReturnData,
	// ReturnFindMethod,
	// Middleware,
} from '../../types';
import { BaseMiddleware } from '../middleware';
import { CreateSessionParams } from './params.interface';
import { ReturnSessionData } from './return-data.interface';

export interface BaseGvAuth {
	generateToken(ownerId: number): Promise<string> | string;

	login<T>(
		find: FindMethod<T>,
		identifier: string,
		password: string,
		matchPassword?: MatchPassword,
	): Promise<ReturnData<T>> | ReturnData<T>;

	register<T, P>(
		create: CreateMethod<T, DataRegister<P>>,
		data: DataRegister<P>,
		hashPassword?: HashPassword,
	): Promise<ReturnData<T>> | ReturnData<T>;

	// getMiddleware(customHeader?: string): Middleware;

	jwtMiddleware(customHeader?: string): BaseMiddleware;
}

/* Exports */
export interface GvSessionServices {
	create(
		params: CreateSessionParams,
	): Promise<ReturnSessionData> | ReturnSessionData;

	find(id: number): Promise<ReturnSessionData> | ReturnSessionData;
}
