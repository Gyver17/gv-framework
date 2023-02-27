# Reject

```tsx
import {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	Conflict,
	Gone,
	PayloadTooLarge,
	UnprocessableEntity,
} from '../../exceptions';

export class Reject {
	// 400
	badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	gone(message: string) {
		throw new Gone(message);
	}

	// 413
	payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}
}
```

El bloque de arriba es un fragmento de código de TypeScript que define una clase llamada `Reject`. Esta clase tiene varios métodos que arrojan excepciones con códigos de estado HTTP específicos, como `badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `gone`, `payloadTooLarge`, y `unprocessableEntity`.

Sí, se pueden hacer algunas mejoras en el código. Para empezar, podríamos considerar agrupar los métodos por código de estado, de manera que quede más claro qué métodos arrojan excepciones con qué códigos de estado. También podríamos considerar agregar documentación a los métodos para explicar qué tipo de situaciones deberían generar cada tipo de excepción.

```
import {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	Conflict,
	Gone,
	PayloadTooLarge,
	UnprocessableEntity,
} from '../../exceptions';

export class Reject {
	// 400
	/**
	 * Lanza una excepción BadRequest con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando la solicitud del cliente es incorrecta o malformada.
	 * @param message Mensaje de error
	 */
	badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	/**
	 * Lanza una excepción Unauthorized con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando la solicitud requiere autenticación y el cliente no ha proporcionado credenciales válidas.
	 * @param message Mensaje de error
	 */
	unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	/**
	 * Lanza una excepción Forbidden con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando el cliente no tiene permiso para acceder al recurso solicitado.
	 * @param message Mensaje de error
	 */
	forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	/**
	 * Lanza una excepción NotFound con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando el recurso solicitado no se puede encontrar.
	 * @param message Mensaje de error
	 */
	notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	/**
	 * Lanza una excepción Conflict con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando la solicitud entra en conflicto con el estado actual del servidor.
	 * @param message Mensaje de error
	 */
	conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	/**
	 * Lanza una excepción Gone con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando el recurso solicitado ya no está disponible y no se espera que vuelva a estarlo.
	 * @param message Mensaje de error
	 */
	gone(message: string) {
		throw new Gone(message);
	}

	// 413
	/**
	 * Lanza una excepción PayloadTooLarge con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando la carga útil de la solicitud es demasiado grande para ser procesada por el servidor.
	 * @param message Mensaje de error
	 */
	payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	/**
	 * Lanza una excepción UnprocessableEntity con el mensaje especificado.
	 * Esta excepción debe ser arrojada cuando la solicitud es semánticamente incorrecta o no puede ser procesada.
	 * @param message Mensaje de error
	 */
	unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}
}

```

The above block is a TypeScript code snippet that defines a class called `Reject`. This class has several methods that throw exceptions with specific HTTP status codes, such as `badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`, `gone`, `payloadTooLarge`, and `unprocessableEntity`.

Yes, there are some improvements that could be made to the code. For starters, we could consider grouping the methods by status code, so it's clearer which methods throw exceptions with which status codes. We could also consider adding documentation to the methods to explain what kind of situations should generate each type of exception.

```tsx
import {
	BadRequest,
	Unauthorized,
	Forbidden,
	NotFound,
	Conflict,
	Gone,
	PayloadTooLarge,
	UnprocessableEntity,
} from '../../exceptions';

export class Reject {
	// 400
	/**
	 * Throws a BadRequest exception with the specified message.
	 * This exception should be thrown when the client's request is incorrect or malformed.
	 * @param message Error message
	 */
	badRequest(message: string) {
		throw new BadRequest(message);
	}

	// 401
	/**
	 * Throws an Unauthorized exception with the specified message.
	 * This exception should be thrown when the request requires authentication and the client has not provided valid credentials.
	 * @param message Error message
	 */
	unauthorized(message: string) {
		throw new Unauthorized(message);
	}

	// 403
	/**
	 * Throws a Forbidden exception with the specified message.
	 * This exception should be thrown when the client does not have permission to access the requested resource.
	 * @param message Error message
	 */
	forbidden(message: string) {
		throw new Forbidden(message);
	}

	// 404
	/**
	 * Throws a NotFound exception with the specified message.
	 * This exception should be thrown when the requested resource cannot be found.
	 * @param message Error message
	 */
	notFound(message: string) {
		throw new NotFound(message);
	}

	// 409
	/**
	 * Throws a Conflict exception with the specified message.
	 * This exception should be thrown when the request conflicts with the current state of the server.
	 * @param message Error message
	 */
	conflict(message: string) {
		throw new Conflict(message);
	}

	// 410
	/**
	 * Throws a Gone exception with the specified message.
	 * This exception should be thrown when the requested resource is no longer available and is not expected to be available again.
	 * @param message Error message
	 */
	gone(message: string) {
		throw new Gone(message);
	}

	// 413
	/**
	 * Throws a PayloadTooLarge exception with the specified message.
	 * This exception should be thrown when the request payload is too large to be processed by the server.
	 * @param message Error message
	 */
	payloadTooLarge(message: string) {
		throw new PayloadTooLarge(message);
	}

	// 422
	/**
	 * Throws an UnprocessableEntity exception with the specified message.
	 * This exception should be thrown when the request is semantically incorrect or cannot be processed.
	 * @param message Error message
	 */
	unprocessableEntity(message: string) {
		throw new UnprocessableEntity(message);
	}
}

```