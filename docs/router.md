# Router

```tsx
import { Router, Request, Response, NextFunction } from 'express';
import { autoBind } from '../utils';
import { GroupParams, BaseGvRouter, RouteParams, Route } from '../interfaces';
import { Controller } from '../types';
import { wrapperMiddleware, Success, Reject } from './utils';

export function route<T>({
	path,
	method,
	controllerMethod,
	controller,
	router,
	middleware = [],
	validation,
	disabled,
}: Route<T>): Router {
	const request = controller[controllerMethod] as Controller;

	return router[method](
		path,
		wrapperMiddleware(middleware),
		async (req: Request, res: Response, next: NextFunction) => {
			const success = new Success(res);
			const reject = new Reject();
			const ownerId = req.ownerId;

			if (!disabled) {
				let validate = null;
				if (validation) {
					try {
						validate = await validation.validate({
							req,
							res,
							success: success.response,
							reject,
							ownerId,
						});
					} catch (error) {
						next(error);
					}
				}

				const handler = request;

				if (typeof handler === 'function') {
					try {
						await request({
							req,
							res,
							success: success.response,
							reject,
							validate,
							ownerId,
						});
					} catch (error) {
						next(error);
					}
				}
			}
		},
	);
}

function group<T>({
	middleware = [],
	prefix = '/',
	routes,
	router,
	controller,
}: Group<T>): Router {
	routes.map(
		({
			path,
			middleware: routeMiddleware = [],
			method,
			controllerMethod,
			validation,
		}) => {
			const routePath = prefix === '/' ? path : prefix + path;

			route({
				path: routePath,
				middleware: [...middleware, ...routeMiddleware],
				method,
				controllerMethod,
				validation,
				router,
				controller,
			});
		},
	);

	return router;
}

export class GvRouter<T> implements BaseGvRouter<T> {
	readonly methods: ['post', 'get', 'put', 'patch', 'delete'];
	public readonly router: Router;
	private readonly controller: T;

	constructor(controller: T) {
		this.controller = controller;
		this.router = Router();
		this.methods = ['post', 'get', 'put', 'patch', 'delete']
		autoBind(this);
	}

	public route(params: RouteParams<T>) {
		return route({
			...params,
			router: this.router,
			controller: this.controller,
		});
	}

	public group(params: GroupParams<T>): Router {
		return group<T>({
			...params,
			router: this.router,
			controller: this.controller,
		});
	}
}
```

El código es una clase `GvRouter` que proporciona métodos para crear rutas y grupos de rutas utilizando el framework Express de Node.js. La clase tiene dos métodos principales: `route` y `group`.

El método `route` crea una nueva ruta en el router de Express. Toma como parámetros la ruta, el método HTTP, el método del controlador que se ejecutará cuando se haga una solicitud a la ruta, middleware (opcional), validación (opcional), y si la ruta está deshabilitada o no. El método `group` permite agrupar múltiples rutas bajo una ruta principal y aplicar middleware a todas las rutas en el grupo.

El código también incluye varias funciones auxiliares para envolver el middleware, manejar las respuestas exitosas y fallidas, y para validar las solicitudes con la biblioteca Joi. La clase también utiliza la función `autoBind` para vincular automáticamente los métodos de la clase a la instancia de la clase, lo que permite que los métodos sean llamados sin tener que vincular manualmente el objeto `this`.

En general, esta clase proporciona una forma fácil y flexible de crear rutas y grupos de rutas en una aplicación Node.js utilizando Express.

### Como mejorarlo

El código de la clase `GvRouter` parece estar bien estructurado y proporciona una buena base para construir rutas y grupos de rutas utilizando Express. Sin embargo, aquí hay algunas sugerencias para mejorar el código:

- En lugar de tener una clase separada para los objetos `Success` y `Reject` que se utilizan en las respuestas de las rutas, podríamos crear una función auxiliar que devuelva una función de respuesta personalizada. Por ejemplo, podríamos crear una función `createResponse` que tome un objeto `res` y devuelva una función que tome un objeto `data` y devuelva una respuesta JSON con los datos proporcionados. Esto podría simplificar el código y hacer que las respuestas sean más consistentes en toda la aplicación.
- La biblioteca Joi se utiliza para validar las solicitudes en algunas de las rutas, pero la validación se realiza de forma asíncrona. Podríamos utilizar la versión sincrónica de Joi (`Joi.validate`) en lugar de la versión asíncrona (`Joi.validateAsync`) para simplificar el código y hacer que la validación sea más fácil de leer.
- La función `autoBind` se utiliza para vincular automáticamente los métodos de la clase a la instancia de la clase, pero esto podría ser confuso para los desarrolladores que no están familiarizados con esta técnica. En su lugar, podríamos simplemente hacer referencia a los métodos utilizando la sintaxis de flecha (`() => this.methodName()`) para evitar cualquier confusión.
- En la función `route`, la validación se realiza utilizando `Joi.validateAsync`, pero si hay un error de validación, el controlador no se ejecutará y se llamará a `next(error)`. Esto podría ser confuso para los desarrolladores que no están familiarizados con esta técnica. En su lugar, podríamos lanzar una excepción en lugar de llamar a `reject()` si hay un error de validación, lo que simplificaría el código y lo haría más fácil de leer.

En general, el código parece estar bien estructurado y proporciona una buena base para crear rutas y grupos de rutas en una aplicación Node.js utilizando Express. Con algunas mejoras, podría ser aún más fácil de leer y mantener.

### Utilidades

success

```tsx
import { Response } from 'express';
import { HttpStatus } from '../../enums';
import { HttpSuccessStatus } from '../../types';
import { autoBind } from '../../utils';

export class Success {
	private readonly res: Response;
	constructor(res: Response) {
		this.res = res;
		autoBind(this);
	}

	public response(data: object, statusCode: HttpSuccessStatus = '200') {
		const code = parseInt(statusCode);
		this.res.status(code);
		this.res.json({
			message: HttpStatus[code],
			status: code,
			data,
		});
	}
}
```

El segundo bloque de código define una clase llamada `Success`, que se utiliza para manejar respuestas exitosas en las rutas. La clase tiene un método `response` que toma un objeto `data` y un código de estado HTTP (opcional) y devuelve una respuesta JSON con los datos proporcionados.

En general, esta clase proporciona una forma fácil y consistente de manejar respuestas exitosas en las rutas de una aplicación Node.js utilizando Express.

[Success](Router%20ddd5146cb9d54d72ba98f355c39c5a9c/Success%20ad4c889bb643441d9aef92ed242cc8b5.md)

[Reject](Router%20ddd5146cb9d54d72ba98f355c39c5a9c/Reject%20979a1fc756ad47c28c1bc7ca573d3ed9.md)

### Ejemplo

Aquí hay un ejemplo de cómo usar la clase `GvRouter` para crear una ruta HTTP en una aplicación Node.js utilizando Express:

Supongamos que queremos crear una ruta para obtener información de perfil de usuario. Primero, necesitamos definir un controlador que maneje la solicitud. Podríamos definir un controlador de ejemplo como este:

```
interface UserProfileResponse {
    name: string;
    email: string;
    age: number;
}

class UserController {
    static async getProfile(req: Request, res: Response, success: Success, reject: Reject) {
        // Lógica para obtener información de perfil de usuario
        const userProfile: UserProfileResponse = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30,
        };

        // Devolver la respuesta exitosa
        success(userProfile);
    }
}

```

Ahora podemos usar la clase `GvRouter` para definir la ruta para obtener información de perfil de usuario. Podríamos hacerlo de la siguiente manera:

```
const userController = new UserController();
const userRouter = new GvRouter<UserController>(userController);

userRouter.route({
    path: '/profile',
    method: 'get',
    controllerMethod: 'getProfile',
});

```

En este ejemplo, creamos una instancia de la clase `UserController` y la pasamos a la clase `GvRouter` para crear un nuevo router. Luego, usamos el método `route` en el router para definir una nueva ruta HTTP en la ruta `/profile`. El método HTTP es `get`, y el método del controlador que se ejecutará cuando se haga una solicitud a la ruta es `getProfile`.

Ahora, cuando un usuario haga una solicitud HTTP GET a la ruta `/profile`, la función `getProfile` del controlador `UserController` se ejecutará, y se devolverá información de perfil de usuario.

Esta es solo una forma de usar la clase `GvRouter` para definir rutas en una aplicación Node.js utilizando Express. La clase proporciona muchas opciones y flexibilidad para definir rutas y grupos de rutas, y se puede utilizar de muchas maneras diferentes para adaptarse a las necesidades de una aplicación específica.

Aquí hay un ejemplo de cómo usar el método `group` de la clase `GvRouter` para agrupar varias rutas en una sola ruta principal:

Supongamos que queremos crear un grupo de rutas para manejar solicitudes de autenticación. Primero, necesitamos definir un controlador que maneje las solicitudes de autenticación. Podríamos definir un controlador de ejemplo como este:

```tsx
class AuthController {
    static async login(req: Request, res: Response, success: Success, reject: Reject) {
        // Lógica para manejar la autenticación del usuario
        // ...

        // Devolver la respuesta exitosa
        success({ message: 'Login successful' });
    }

    static async logout(req: Request, res: Response, success: Success, reject: Reject) {
        // Lógica para manejar el cierre de sesión del usuario
        // ...

        // Devolver la respuesta exitosa
        success({ message: 'Logout successful' });
    }
}

```

Ahora podemos usar la clase `GvRouter` para definir el grupo de rutas para manejar las solicitudes de autenticación. Podríamos hacerlo de la siguiente manera:

```
const authController = new AuthController();
const authRouter = new GvRouter<AuthController>(authController);

authRouter.group({
    prefix: '/auth',
    middleware: [someMiddleware],
    routes: [
        {
            path: '/login',
            method: 'post',
            controllerMethod: 'login',
        },
        {
            path: '/logout',
            method: 'post',
            controllerMethod: 'logout',
        },
    ],
});

```

En este ejemplo, creamos una instancia de la clase `AuthController` y la pasamos a la clase `GvRouter` para crear un nuevo router. Luego, usamos el método `group` en el router para agrupar dos rutas bajo la ruta principal `/auth`. También aplicamos un middleware a todas las rutas en el grupo.

Ahora, cuando un usuario haga una solicitud HTTP POST a la ruta `/auth/login`, la función `login` del controlador `AuthController` se ejecutará, y se manejará la autenticación del usuario. Cuando un usuario haga una solicitud HTTP POST a la ruta `/auth/logout`, la función `logout` del controlador `AuthController` se ejecutará, y se manejará el cierre de sesión del usuario.

Esta es solo una forma de usar el método `group` de la clase `GvRouter` para agrupar varias rutas en una sola ruta principal. La clase proporciona muchas opciones y flexibilidad para agrupar rutas y aplicar middleware a todas las rutas en un grupo, y se puede utilizar de muchas maneras diferentes para adaptarse a las necesidades de una aplicación específica.