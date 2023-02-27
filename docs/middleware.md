# Middleware

---

```tsx
import { NextFunction, Request, Response } from 'express';
import { Reject } from '../../router/utils';

export interface MiddlewareParams {
	req: Request;
	res: Response;
	reject: Reject;
	ownerId?: number;
}

export interface BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction): Promise<void> | void;
}
```

Claro, aquí te muestro un ejemplo de cómo se puede usar la interfaz `BaseMiddleware` para crear un middleware que verifica si el `ownerId` pasado en el objeto `context` coincide con un valor específico:

```tsx
import { BaseMiddleware, MiddlewareParams } from './middleware';

export class OwnerMiddleware implements BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction) {
		const { ownerId } = context;
		if (ownerId !== 123) {
			context.reject('Unauthorized');
			return;
		}
		next();
	}
}

```

Este middleware se puede usar de esta manera en tu aplicación:

```tsx
import { Router } from 'express';
import { OwnerMiddleware } from './middlewares/owner.middleware';

const router = Router();

router.get('/resource', new OwnerMiddleware().use, (req, res) => {
	// código para manejar la petición
});

```

En este ejemplo, estamos creando una instancia del middleware `OwnerMiddleware` y utilizando su método `use` como un middleware en una ruta específica. Cuando se hace una petición a esa ruta, el middleware verificará si el `ownerId` en el objeto `context` coincide con el valor esperado. Si no es así, se rechazará la solicitud con un mensaje de error. Si todo está bien, la solicitud se pasará al siguiente middleware o controlador.

¡Por supuesto! Aquí hay otro ejemplo que muestra cómo se puede usar el middleware para verificar si el usuario ha iniciado sesión antes de permitir el acceso a una ruta protegida en una aplicación web:

```tsx
import { BaseMiddleware, MiddlewareParams } from './middleware';
import { Unauthorized } from '../errors/unauthorized.error';

export class AuthMiddleware implements BaseMiddleware {
  use(context: MiddlewareParams, next: NextFunction) {
    const { req } = context;
    if (!req.session || !req.session.userId) {
      throw new Unauthorized('User must be logged in');
    }
    next();
  }
}

```

Aquí, el middleware `AuthMiddleware` verifica si el objeto `req.session` existe y si contiene un `userId`. Si no es así, se lanza un error `Unauthorized`. De lo contrario, se permite el acceso a la ruta. Este middleware se puede usar en una aplicación web de esta manera:

```tsx
import express from 'express';
import { AuthMiddleware } from './middlewares/auth.middleware';

const app = express();

// Agregar middleware global para todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas protegidas
app.get('/dashboard', new AuthMiddleware().use, (req, res) => {
  res.send('Welcome to the dashboard!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

```

En este ejemplo, el middleware `AuthMiddleware` se utiliza como middleware en la ruta `/dashboard`. Esto significa que antes de acceder a la ruta, el middleware verificará si el usuario ha iniciado sesión. Si no es así, se lanzará un error `Unauthorized`. Si el usuario ha iniciado sesión correctamente, se permitirá el acceso a la ruta y se mostrará el mensaje "Welcome to the dashboard!".

# Middleware

---

```tsx
import { NextFunction, Request, Response } from 'express';
import { Reject } from '../../router/utils';

export interface MiddlewareParams {
	req: Request;
	res: Response;
	reject: Reject;
	ownerId?: number;
}

export interface BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction): Promise<void> | void;
}

```

Sure, here's an example of how the `BaseMiddleware` interface can be used to create middleware that verifies if the `ownerId` passed in the `context` object matches a specific value:

```tsx
import { BaseMiddleware, MiddlewareParams } from './middleware';

export class OwnerMiddleware implements BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction) {
		const { ownerId } = context;
		if (ownerId !== 123) {
			context.reject('Unauthorized');
			return;
		}
		next();
	}
}

```

This middleware can be used like this in your application:

```tsx
import { Router } from 'express';
import { OwnerMiddleware } from './middlewares/owner.middleware';

const router = Router();

router.get('/resource', new OwnerMiddleware().use, (req, res) => {
	// code to handle the request
});

```

In this example, we're creating an instance of the `OwnerMiddleware` middleware and using its `use` method as middleware on a specific route. When a request is made to that route, the middleware will check if the `ownerId` in the `context` object matches the expected value. If it doesn't, the request will be rejected with an error message. If everything is okay, the request will be passed on to the next middleware or controller.

Of course! Here's another example that shows how middleware can be used to verify if the user is logged in before allowing access to a protected route in a web application:

```tsx
import { BaseMiddleware, MiddlewareParams } from './middleware';
import { Unauthorized } from '../errors/unauthorized.error';

export class AuthMiddleware implements BaseMiddleware {
  use(context: MiddlewareParams, next: NextFunction) {
    const { req } = context;
    if (!req.session || !req.session.userId) {
      throw new Unauthorized('User must be logged in');
    }
    next();
  }
}

```

Here, the `AuthMiddleware` middleware checks if the `req.session` object exists and if it contains a `userId`. If it doesn't, an `Unauthorized` error is thrown. Otherwise, access to the route is allowed. This middleware can be used in a web application like this:

```tsx
import express from 'express';
import { AuthMiddleware } from './middlewares/auth.middleware';

const app = express();

// Add global middleware for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protected routes
app.get('/dashboard', new AuthMiddleware().use, (req, res) => {
  res.send('Welcome to the dashboard!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

```

In this example, the `AuthMiddleware` middleware is used as middleware on the `/dashboard` route. This means that before accessing the route, the middleware will check if the user is logged in. If they're not, an `Unauthorized` error is thrown. If the user has successfully logged in, access to the route is allowed and the message "Welcome to the dashboard!" is displayed.