// @Library
import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import ms from 'ms';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { Request } from 'express';

// @gv-framework
import { autoBind } from '../utils';
import {
	FindMethod,
	CreateMethod,
	DataRegister,
	MatchPassword,
	HashPassword,
	Middleware,
} from '../types';
import { BadJWT, InvalidJWT, RequiredJWT, Unauthorized } from '../exceptions';
import { BaseGvAuth, BaseMiddleware, GvSessionServices } from '../interfaces';
import { AuthMessage } from '../enums';
import { JWTMiddleware } from './utils';

export class GvAuth implements BaseGvAuth {
	constructor(
		private readonly sessionServices: GvSessionServices,
		private readonly options?: SignOptions,
		private readonly verifyOptions?: VerifyOptions,
	) {
		autoBind(this);
	}

	public async generateToken(ownerId: number) {
		const secretKey = v4();
		const expiresIn = this.options?.expiresIn || 20 * 20 * 24;

		const expiresAt = this.convertExpiredInToDate(expiresIn);

		const { id: session } = await this.sessionServices.create({
			ownerId,
			secretKey,
			expiresAt,
		});

		const payload = {
			id: ownerId,
			session,
		};

		return jwt.sign(payload, secretKey, {
			...(this.options || { expiresIn }),
		});
	}

	public async login<T>(
		find: FindMethod<T>,
		identifier: string,
		password: string,
		matchPassword?: MatchPassword,
	) {
		const data = await find(identifier);

		const compare = matchPassword || bcrypt.compare;

		if (!(await compare(password, data?.password))) {
			throw new Unauthorized(AuthMessage.INVALID_CREDENTIALS);
		}

		// delete data.password;

		const accessToken = await this.generateToken(data.id);

		return { ...data, accessToken };
	}

	public async register<T, P>(
		create: CreateMethod<T, P>,
		data: DataRegister<P>,
		hashPassword?: HashPassword,
	) {
		let password: string;
		if (hashPassword) {
			password = await hashPassword(data.password);
		} else {
			const salt = await bcrypt.genSalt(15);
			password = await bcrypt.hash(data.password, salt);
		}

		const record = await create(Object.assign(data, { password }));

		// if(record.password) delete record.password;

		const accessToken = await this.generateToken(record.id);

		return { ...record, accessToken };
	}

	public jwtMiddleware(customHeader?: string): BaseMiddleware {
		return new JWTMiddleware(this.getMiddleware(customHeader));
	}

	private getMiddleware(customHeader?: string): Middleware {
		return async (req, res, next) => {
			const token = this.getToken(req, customHeader);

			const payload = this.decodeToken(token);

			if (!payload?.session) throw new BadJWT();
			const session: number = payload.session;
			const { secretKey } = await this.sessionServices.find(session);

			jwt.verify(
				token,
				secretKey,
				this.verifyOptions,
				(error, decode: any) => {
					if (error) next(new InvalidJWT());
					if (!decode?.ownerId) throw new BadJWT();
					req.ownerId = decode.ownerId;
					next();
				},
			);
		};
	}

	private getToken(req: Request, customHeader?: string): string {
		let token = null;
		if (customHeader) {
			token = req.headers[customHeader];
			if (Array.isArray(token)) {
				throw new BadJWT();
			}
		} else {
			const authHeader = req.headers['authorization'];
			token = authHeader && authHeader.split(' ')[1];
		}

		if (!token) throw new RequiredJWT();

		return token;
	}

	private decodeToken(token: string): JwtPayload {
		const payload = jwt.decode(token);

		if (typeof payload === 'string' || payload === null) {
			throw new BadJWT();
		}

		return payload;
	}

	private convertExpiredInToDate(expiresIn: string | number): string {
		const today = new Date();

		const milliseconds: number =
			typeof expiresIn === 'string' ? ms(expiresIn) : ms(ms(expiresIn));

		const dateExpired = new Date(today.getTime() + milliseconds);

		return dateExpired.toISOString();
	}
}
