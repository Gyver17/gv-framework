# Middleware

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

The `BaseMiddleware` interface is used to create middleware in `gv-framework` applications. It defines a `use` method that takes a `context` object and a `next` function. The `context` object contains information about the incoming request, such as the `Request` and `Response` objects. The `next` function is a callback function that is called when the middleware has finished processing the request and is ready to pass it on to the next middleware or controller.

By creating a class that implements the `BaseMiddleware` interface and defining its `use` method, middleware can be created to perform tasks such as user authentication, data validation, and request and response manipulation. In the example included in the document, it is shown how the `BaseMiddleware` interface can be used to create middleware that verifies if the `ownerId` passed in the `context` object matches a specific value. It also shows how middleware can be used to verify if the user is logged in before allowing access to a protected route in a web application.

Here is an example of how the `BaseMiddleware` interface can be used to create middleware that verifies if the `ownerId` passed in the `context` object matches a specific value:

```tsx
import { BaseMiddleware, MiddlewareParams } from 'gv-framework';

export class OwnerMiddleware implements BaseMiddleware {
	use(context: MiddlewareParams, next: NextFunction) {
		const { ownerId } = context;
		if (ownerId !== 123) {
			context.reject.unauthorized('Unauthorized');
		}
		next();
	}
}

```

This middleware can be used in your application like this:

```tsx
import { GvRouter } from 'gv-framework';
import { OwnerMiddleware } from './middlewares/owner.middleware';
import { MyController } from './controllers/my.controller';

const myController = new MyController();
const gv = new GvRouter(myController);

gv.route({
	path: '/my-path',
	method: 'get',
	middleware: [new OwnerMiddleware()],
	controllerMethod: 'myController',
});

```

In this example, we are creating an instance of the `OwnerMiddleware` middleware and using its `use` method as middleware on a specific route. When a request is made to that route, the middleware will verify if the `ownerId` in the `context` object matches the expected value. If it does not, the request will be rejected with an error message. If everything is okay, the request will be passed on to the next middleware or controller.