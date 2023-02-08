import { ReturnFindMethod } from './data.type';

export type FindMethod<T> = (
	value: string,
) => Promise<ReturnFindMethod<T>> | ReturnFindMethod<T>;

export type CreateMethod<T, P> = (
	value: P,
) => Promise<ReturnFindMethod<T>> | ReturnFindMethod<T>;
