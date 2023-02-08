export type ReturnFindMethod<T = Record<string, any>> = T & {
	id: number;
	password: string;
};

export type ReturnData<T> = ReturnFindMethod<T> & {
	accessToken: string;
};

export type DataRegister<T = Record<string, any>> = T & {
	password: string;
};
