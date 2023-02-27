# Auth

```tsx
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
```

El bloque de código anterior es una implementación en TypeScript de una clase llamada `GvAuth` que se utiliza para realizar la autenticación en una aplicación. La clase proporciona métodos para generar tokens de autenticación, iniciar sesión y registrar nuevos usuarios. También proporciona un middleware para proteger las rutas que requieren autenticación. La clase utiliza la biblioteca `jsonwebtoken` para generar y verificar tokens JWT y la biblioteca `bcryptjs` para el hash y la comparación de contraseñas. Además, la clase depende de otras clases y tipos definidos en el código.

### Documentación

El bloque de código es una implementación en TypeScript de una clase llamada `GvAuth` que se utiliza para realizar la autenticación en una aplicación. La clase proporciona métodos para generar tokens de autenticación, iniciar sesión y registrar nuevos usuarios. También proporciona un middleware para proteger las rutas que requieren autenticación. La clase utiliza la biblioteca `jsonwebtoken` para generar y verificar tokens JWT y la biblioteca `bcryptjs` para el hash y la comparación de contraseñas. Además, la clase depende de otras clases y tipos definidos en el código.

La clase `GvAuth` tiene los siguientes métodos:

- `generateToken(ownerId: number)`: Este método genera un token de autenticación para el usuario con el `ownerId` proporcionado. El método utiliza una clave secreta única generada automáticamente y una fecha de caducidad especificada en las opciones de configuración. El método devuelve el token generado.
- `login<T>(find: FindMethod<T>, identifier: string, password: string, matchPassword?: MatchPassword)`: Este método inicia sesión en la aplicación con el identificador y la contraseña proporcionados. El método utiliza una función de búsqueda proporcionada para buscar el usuario en la base de datos. Si el usuario es encontrado y la contraseña coincide, el método genera un token de autenticación para ese usuario y lo devuelve junto con los datos del usuario.
- `register<T, P>(create: CreateMethod<T, P>, data: DataRegister<P>, hashPassword?: HashPassword)`: Este método registra un nuevo usuario en la aplicación con los datos proporcionados. El método utiliza una función de creación proporcionada para crear un registro de usuario en la base de datos. El método también utiliza una función de hash de contraseña opcional proporcionada para cifrar la contraseña del usuario. Si se proporciona una función de hash de contraseña, se utilizará; de lo contrario, se utilizará una función generadora de sal de `bcryptjs`. El método devuelve los datos del usuario recién registrado junto con un token de autenticación.
- `jwtMiddleware(customHeader?: string): BaseMiddleware`: Este método devuelve un middleware que se utiliza para proteger las rutas que requieren autenticación. El middleware verifica la validez del token de autenticación en la solicitud, extrae los datos del usuario del token y los adjunta a la solicitud para su uso posterior. El middleware utiliza la clave secreta única almacenada en la base de datos para verificar la validez del token. El método acepta un parámetro opcional que especifica el encabezado personalizado donde se encuentra el token de autenticación.

Además, la clase define varios tipos y excepciones utilizados en la implementación de la autenticación.

### English

```
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

```

The above TypeScript code block is an implementation of a class called `GvAuth` that is used for authentication in an application. The class provides methods for generating authentication tokens, logging in, and registering new users. It also provides middleware for protecting routes that require authentication. The class uses the `jsonwebtoken` library for generating and verifying JWT tokens and the `bcryptjs` library for password hashing and comparison. Additionally, the class depends on other classes and types defined in the code.

### Documentation

The above code block is an implementation of a class called `GvAuth` that is used for authentication in an application. The class provides methods for generating authentication tokens, logging in, and registering new users. It also provides middleware for protecting routes that require authentication. The class uses the `jsonwebtoken` library for generating and verifying JWT tokens and the `bcryptjs` library for password hashing and comparison. Additionally, the class depends on other classes and types defined in the code.

The `GvAuth` class has the following methods:

- `generateToken(ownerId: number)`: This method generates an authentication token for the user with the provided `ownerId`. The method uses a unique secret key generated automatically and a expiry date specified in the configuration options. The method returns the generated token.
- `login<T>(find: FindMethod<T>, identifier: string, password: string, matchPassword?: MatchPassword)`: This method logs in to the application with the provided identifier and password. The method uses a provided search function to find the user in the database. If the user is found and the password matches, the method generates an authentication token for that user and returns it along with the user's data.
- `register<T, P>(create: CreateMethod<T, P>, data: DataRegister<P>, hashPassword?: HashPassword)`: This method registers a new user in the application with the provided data. The method uses a provided creation function to create a user record in the database. The method also uses an optional password hash function provided to encrypt the user's password. If a password hash function is provided, it will be used; otherwise, a salt generator function from `bcryptjs` will be used. The method returns the newly registered user's data along with an authentication token.
- `jwtMiddleware(customHeader?: string): BaseMiddleware`: This method returns middleware that is used to protect routes that require authentication. The middleware verifies the validity of the authentication token in the request, extracts the user data from the token, and attaches it to the request for later use. The middleware uses the unique secret key stored in the database to verify the token's validity. The method accepts an optional parameter that specifies the custom header where the authentication token is located.

Additionally, the class defines several types and exceptions used in the authentication implementation.

Por supuesto, aquí hay una versión mejorada de la documentación:

# Clase GvAuth

La clase `GvAuth` proporciona una interfaz para la autenticación de usuarios en una aplicación. Utiliza tokens JWT para autenticar a los usuarios y proporciona métodos para iniciar sesión, registrar nuevos usuarios y proteger rutas que requieren autenticación.

## Métodos

### `generateToken(ownerId: number): Promise<string>`

Este método genera un token de autenticación para el usuario con el `ownerId` proporcionado. El token es generado utilizando una clave secreta única generada automáticamente y una fecha de caducidad especificada en las opciones de configuración.

### `login<T>(find: FindMethod<T>, identifier: string, password: string, matchPassword?: MatchPassword): Promise<object>`

Este método inicia sesión en la aplicación con el identificador y la contraseña proporcionados. El método utiliza una función de búsqueda para encontrar al usuario en la base de datos. Si el usuario es encontrado y la contraseña coincide, se genera un token de autenticación para ese usuario y se devuelve junto con los datos del usuario.

### `register<T, P>(create: CreateMethod<T, P>, data: DataRegister<P>, hashPassword?: HashPassword): Promise<object>`

Este método registra un nuevo usuario en la aplicación con los datos proporcionados. El método utiliza una función de creación para crear un registro de usuario en la base de datos. El método también utiliza una función de hash de contraseña opcional para cifrar la contraseña del usuario. Si se proporciona una función de hash de contraseña, se utilizará; de lo contrario, se utilizará una función generadora de sal de `bcryptjs`. El método devuelve los datos del usuario recién registrado junto con un token de autenticación.

### `jwtMiddleware(customHeader?: string): BaseMiddleware`

Este método devuelve un middleware que se utiliza para proteger las rutas que requieren autenticación. El middleware verifica la validez del token de autenticación en la solicitud, extrae los datos del usuario del token y los adjunta a la solicitud para su uso posterior. El middleware utiliza la clave secreta única almacenada en la base de datos para verificar la validez del token. El método acepta un parámetro opcional que especifica el encabezado personalizado donde se encuentra el token de autenticación.

## Tipos

### `FindMethod<T>`

Tipo de función que se utiliza para buscar un usuario en la base de datos.

### `CreateMethod<T, P>`

Tipo de función que se utiliza para crear un registro de usuario en la base de datos.

### `DataRegister<P>`

Tipo de objeto que se utiliza para registrar un nuevo usuario en la aplicación.

### `MatchPassword`

Tipo de función que se utiliza para comparar una contraseña proporcionada con una contraseña almacenada en la base de datos.

### `HashPassword`

Tipo de función que se utiliza para cifrar una contraseña antes de almacenarla en la base de datos.

### `Middleware`

Tipo de función que se utiliza para crear un middleware.

### Excepciones

### `BadJWT`

Se lanza cuando se proporciona un token JWT no válido.

### `InvalidJWT`

Se lanza cuando se proporciona un token JWT inválido.

### `RequiredJWT`

Se lanza cuando no se proporciona un token JWT en la solicitud.

### `Unauthorized`

Se lanza cuando se proporcionan credenciales de inicio de sesión no válidas.

## Dependenencias

La clase `GvAuth` depende de las siguientes bibliotecas y módulos:

- `jsonwebtoken`
- `ms`
- `uuid`
- `bcryptjs`
- `express`
- `../utils`
- `../types`
- `../exceptions`
- `../interfaces`
- `../enums`
- `./utils`

## Ejemplo

```
import { GvAuth } from './auth';

// crea una instancia de GvAuth con tus propios parámetros
const auth = new GvAuth(mySessionServices);

// inicia sesión con un identificador y una contraseña
const user = await auth.login(myFindMethod, 'nombre_de_usuario', 'contraseña');

// user contendrá los datos del usuario, incluido el token de autenticación generado
console.log(user);

```

En este ejemplo, primero creamos una instancia de la clase `GvAuth` utilizando un objeto `mySessionServices` como argumento. Luego, llamamos al método `login` de la instancia de `GvAuth` con un objeto `myFindMethod`, el nombre de usuario y la contraseña del usuario. El método `login` buscará al usuario en la base de datos utilizando el objeto `myFindMethod`, comprobará si la contraseña proporcionada coincide con la contraseña almacenada y, si es así, generará un token de autenticación para el usuario y lo devolverá junto con los datos del usuario.

Espero que esto te haya ayudado. ¡Hazme saber si tienes alguna otra pregunta!

### Ejemplos

Claro, aquí te muestro un ejemplo de cómo utilizar el método `login` de la clase `GvAuth` para iniciar sesión en la aplicación:

```
import { GvAuth } from './auth';

// crea una instancia de GvAuth con tus propios parámetros
const auth = new GvAuth(mySessionServices);

// inicia sesión con un identificador y una contraseña
const user = await auth.login(myFindMethod, 'nombre_de_usuario', 'contraseña');

// user contendrá los datos del usuario, incluido el token de autenticación generado
console.log(user);

```

En este ejemplo, primero creamos una instancia de la clase `GvAuth` utilizando un objeto `mySessionServices` como argumento. Luego, llamamos al método `login` de la instancia de `GvAuth` con un objeto `myFindMethod`, el nombre de usuario y la contraseña del usuario. El método `login` buscará al usuario en la base de datos utilizando el objeto `myFindMethod`, comprobará si la contraseña proporcionada coincide con la contraseña almacenada y, si es así, generará un token de autenticación para el usuario y lo devolverá junto con los datos del usuario.

Espero que esto te haya ayudado. ¡Hazme saber si tienes alguna otra pregunta!

Claro, aquí te muestro un ejemplo de cómo utilizar los métodos `generateToken` y `register` de la clase `GvAuth` para generar un token de autenticación y registrar un nuevo usuario en la aplicación:

```
import { GvAuth } from './auth';

// crea una instancia de GvAuth con tus propios parámetros
const auth = new GvAuth(mySessionServices);

// genera un token de autenticación para el usuario con ownerId = 1
const token = await auth.generateToken(1);

// imprime el token generado
console.log(token);

// registra un nuevo usuario con los datos proporcionados
const newUser = await auth.register(myCreateMethod, { username: 'nuevo_usuario', password: 'contraseña' });

// newUser contendrá los datos del usuario recién registrado, incluido el token de autenticación generado
console.log(newUser);

```

En este ejemplo, primero creamos una instancia de la clase `GvAuth` utilizando un objeto `mySessionServices` como argumento. Luego, llamamos al método `generateToken` de la instancia de `GvAuth` con el `ownerId` del usuario para el que queremos generar un token de autenticación. El método `generateToken` generará un token de autenticación para el usuario y lo devolverá. Finalmente, imprimimos el token generado en la consola.

Luego, llamamos al método `register` de la instancia de `GvAuth` con un objeto `myCreateMethod` y los datos del usuario que queremos registrar. El método `register` creará un registro de usuario en la base de datos utilizando la función de creación proporcionada y cifrará la contraseña del usuario utilizando la función de hash de contraseña proporcionada o la función generadora de sal de `bcryptjs`. El método devolverá los datos del usuario recién registrado junto con un token de autenticación. Finalmente, imprimimos los datos del usuario recién registrado en la consola.

Espero que esto te haya ayudado. ¡Hazme saber si tienes alguna otra pregunta!