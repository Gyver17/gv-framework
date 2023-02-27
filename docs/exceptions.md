# Exceptions

---

```tsx
import { HttpStatus } from '../../enums';

export class HttpException extends Error {
	readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.name = HttpStatus[statusCode];
	}

	public toJSON() {
		return {
			name: this.name,
			details: this.message,
			status: this.statusCode,
		};
	}

	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}
```

Este bloque de código de TypeScript define la clase `HttpException`, que extiende la clase `Error`. La clase `HttpException` tiene un constructor que acepta un mensaje de error y un código de estado HTTP. El constructor llama al constructor de la clase `Error` con el mensaje de error, y luego asigna el código de estado HTTP y el nombre del código de estado como propiedades de la instancia.

La clase `HttpException` también tiene dos métodos públicos: `toJSON` y `toJSONApi`. Ambos métodos devuelven un objeto que contiene información sobre la excepción. El método `toJSON` devuelve un objeto con el nombre, detalles y estado de la excepción, mientras que el método `toJSONApi` devuelve un objeto con un arreglo que contiene el resultado del método `toJSON`.

Este bloque de código es útil para crear excepciones personalizadas en una aplicación Node.js que utiliza TypeScript. Al extender la clase `Error`, se pueden capturar estas excepciones y manejarlas de manera consistente en toda la aplicación.

### Mejorar

Este bloque de código es una implementación sólida de una excepción personalizada en TypeScript. Sin embargo, aquí hay algunas sugerencias para mejorarlo:

- Agregue documentación para la clase `HttpException` y sus métodos públicos para que otros desarrolladores puedan entender cómo usarla y qué esperar de ella.
- Considere agregar más propiedades a la excepción, como una marca de tiempo o una descripción detallada del error.
- En lugar de tener dos métodos separados (`toJSON` y `toJSONApi`), podría tener un solo método que acepte un parámetro que especifica el formato de salida deseado.
- Considere agregar pruebas unitarias para la clase `HttpException` para garantizar que funcione correctamente en diferentes situaciones de uso.

Además de una marca de tiempo y una descripción detallada del error, se podrían agregar propiedades como el tipo de error (por ejemplo, "validación", "autenticación", etc.), el nombre de la función o método que arrojó la excepción, y cualquier información adicional relevante que pueda ayudar a los desarrolladores a solucionar el problema. Estas propiedades pueden agregarse como clave-valor al objeto devuelto por el método `toJSON()` de la clase `HttpException`.

Para obtener el nombre de la función o método que arrojó la excepción, puede usar la propiedad `stack` del objeto de excepción. La propiedad `stack` contiene una traza de pila, que incluye información sobre el origen de la excepción, incluido el nombre de la función o método que la arrojó.

Por ejemplo, puede usar la siguiente expresión para obtener el nombre de la función o método que arrojó la excepción:

```
const functionName = (new Error()).stack.split('\\n')[2].trim().split(' ')[1];

```

Esta expresión crea una nueva instancia de la clase `Error`, captura la traza de pila, extrae la tercera línea de la traza de pila (que contiene información sobre la función o método que arrojó la excepción) y luego extrae el nombre de la función o método de esa línea.

Tenga en cuenta que esta técnica solo funciona si la excepción se arrojó dentro del mismo archivo TypeScript que está llamando a la expresión. Si la excepción se arrojó en otro archivo, la traza de pila puede ser diferente y el nombre de la función o método no estará en la misma línea.

### Documentación

```
/**
 * Clase personalizada para excepciones HTTP.
 */
import { HttpStatus } from '../../enums';

export class HttpException extends Error {
	readonly statusCode: number;

	/**
	 * Constructor de la clase HttpException.
	 * @param message Mensaje de error.
	 * @param statusCode Código de estado HTTP.
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.name = HttpStatus[statusCode];
	}

	/**
	 * Devuelve un objeto con información sobre la excepción.
	 * @returns Objeto con el nombre, detalles y estado de la excepción.
	 */
	public toJSON() {
		return {
			name: this.name,
			details: this.message,
			status: this.statusCode,
		};
	}

	/**
	 * Devuelve un objeto con un arreglo que contiene el resultado del método `toJSON`.
	 * @returns Objeto con un arreglo que contiene el resultado del método `toJSON`.
	 */
	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}

```

La clase `HttpException` es una clase personalizada para manejar excepciones HTTP en aplicaciones Node.js escritas en TypeScript. Esta clase extiende la clase `Error` y tiene las siguientes propiedades y métodos:

- `statusCode`: un número que representa el código de estado HTTP de la excepción.
- `constructor`: un método que acepta un mensaje de error y un código de estado HTTP como argumentos y asigna estos valores a las propiedades correspondientes de la instancia.
- `toJSON`: un método que devuelve un objeto con información sobre la excepción, incluyendo el nombre, detalles y estado de la excepción.
- `toJSONApi`: un método que devuelve un objeto con un arreglo que contiene el resultado del método `toJSON`.

Para usar la clase `HttpException`, simplemente cree una nueva instancia de la clase con un mensaje de error y un código de estado HTTP, y luego arroje la excepción en su código. Por ejemplo:

```
throw new HttpException('No se pudo encontrar el recurso solicitado.', HttpStatus.NOT_FOUND);

```

Para manejar la excepción, puede capturarla en un bloque `try...catch` y luego llamar al método `toJSONApi` para obtener un objeto que puede enviar como respuesta a la solicitud HTTP. Por ejemplo:

```
try {
    // Código que puede arrojar una excepción HttpException
} catch (error) {
    res.status(error.statusCode).json(error.toJSONApi());
}

```

Al documentar la clase `HttpException`, se ha agregado información relevante sobre el propósito de la clase y cómo se puede usar en la aplicación. Esto ayuda a otros desarrolladores a entender cómo funciona la clase y cómo pueden usarla en su propio código.

### Database Exception

---

```tsx
export class DatabaseException extends HttpException {
	public readonly type: string;
	public readonly statusCode: number;
	public readonly field?: string;

	constructor({
		message,
		type,
		httpCode,
		field,
	}: DatabaseExceptionConstructor) {
		super(message, httpCode);
		this.type = type;
		this.statusCode = httpCode;
		this.field = field;
	}

	public toDbJSON() {
		return {
			...super.toJSON(),
			...(this.field && { field: this.field }),
			type: this.type,
		};
	}

	public toDbJSONApi() {
		return { errors: [this.toDbJSON()] };
	}
}
```

In the `DatabaseException` class, you can see that it extends the `HttpException` class. It has a constructor that accepts an object with the following properties: `message`, `type`, `httpCode`, and `field`. It then calls the constructor of the `HttpException` class with the `message` and `httpCode` properties, and assigns the `type` and `field` properties to the instance.

The `DatabaseException` class also has two methods: `toDbJSON` and `toDbJSONApi`. Both methods return an object that contains information about the exception. The `toDbJSON` method returns an object with the same properties as the `toJSON` method of the `HttpException` class, as well as the `type` and `field` properties of the instance. The `toDbJSONApi` method returns an object with an array that contains the result of the `toDbJSON` method.

To use the `DatabaseException` class, you can create a new instance of the class with an object that has the necessary properties, and then throw the exception in your code. For example:

```tsx
throw new DatabaseException({
    message: 'Error al conectarse a la base de datos.',
    type: 'DatabaseConnectionError',
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
});

```

To handle the exception, you can catch it in a `try...catch` block and then call the `toDbJSONApi` method to get an object that you can send as a response to the HTTP request. For example:

```
try {
    // Código que puede arrojar una excepción DatabaseException
} catch (error) {
    res.status(error.statusCode).json(error.toDbJSONApi());
}

```

In the `DatabaseException` class, you can add more properties and methods as needed to provide additional information about the exception. You can also modify the `toDbJSON` and `toDbJSONApi` methods to include these new properties.

When creating a new instance of the `DatabaseException` class, you should provide a meaningful message that describes the error that occurred, as well as an appropriate `type` and `httpCode` value. The `field` property is optional and can be used to provide additional information about the specific field in the database that caused the error.

### Validation Exception

---

```tsx
import { ValidationError } from '@apideck/better-ajv-errors';
import { HttpStatus } from '../../enums';

export class ValidationException {
	statusCode: number;

	constructor(private readonly errors: ValidationError[]) {
		this.statusCode = 422;
	}

	public toJSON() {
		return this.errors.map((error) => {
			const details = error.message;
			const type = error.context.errorType;
			const suggestion = error.suggestion;
			const path = error.path;

			if (type === 'required') {
				return {
					status: this.statusCode,
					name: HttpStatus[this.statusCode],
					details,
					type,
					suggestion,
					field: details.split(' ')[5]?.slice(1, -1) || path,
				};
			}

			return {
				status: this.statusCode,
				name: HttpStatus[this.statusCode],
				details,
				type,
				suggestion,
				field: error.path.split('.')[1],
			};
		});
	}

	public toJSONApi() {
		return { errors: this.toJSON() };
	}
}
```

La clase `ValidationException` es una clase personalizada para manejar excepciones de validación en aplicaciones Node.js que utilizan `better-ajv-errors`. Esta clase no extiende la clase `HttpException` como las excepciones anteriores.

El constructor de la clase acepta un arreglo de objetos `ValidationError` y asigna un valor a la propiedad `statusCode`. La clase `ValidationException` tiene dos métodos públicos: `toJSON` y `toJSONApi`. Ambos métodos devuelven un arreglo de objetos que contiene información sobre cada error de validación.

El método `toJSON` itera sobre el arreglo de objetos `ValidationError` y devuelve un arreglo de objetos que contiene información sobre cada error de validación. Cada objeto contiene propiedades como el `status` (código de estado HTTP), `name` (nombre del código de estado), `details` (mensaje de error), `type` (tipo de error), `suggestion` (sugerencia de corrección) y `field` (campo que causó el error de validación).

El método `toJSONApi` simplemente devuelve un objeto que contiene un arreglo que contiene el resultado del método `toJSON`.

Para usar la clase `ValidationException`, simplemente cree una nueva instancia de la clase con un arreglo de objetos `ValidationError`, y luego arroje la excepción en su código. Por ejemplo:

```
const errors: ValidationError[] = [
    {
        message: 'El campo "nombre" es requerido.',
        keyword: 'required',
        params: {
            missingProperty: 'nombre',
        },
        dataPath: '',
        schemaPath: '#/required',
        context: {
            key: null,
            label: 'nombre',
            message: 'El campo "nombre" es requerido.',
            value: undefined,
            schema: {
                type: 'object',
                properties: {
                    nombre: {
                        type: 'string',
                    },
                },
                required: ['nombre'],
                additionalProperties: false,
            },
            parentSchema: {
                type: 'object',
                properties: {
                    nombre: {
                        type: 'string',
                    },
                },
                required: ['nombre'],
                additionalProperties: false,
            },
            errorType: 'required',
            path: '',
            ...,
        },
        ...,
    },
    ...,
];

throw new ValidationException(errors);

```

Para manejar la excepción, puede capturarla en un bloque `try...catch` y luego llamar al método `toJSONApi` para obtener un objeto que puede enviar como respuesta a la solicitud HTTP. Por ejemplo:

```
try {
    // Código que puede arrojar una excepción ValidationException
} catch (error) {
    res.status(error.statusCode).json(error.toDbJSONApi());
}

```

Al documentar la clase `ValidationException`, se ha agregado información relevante sobre el propósito de la clase y cómo se puede usar en la aplicación. Esto ayuda a otros desarrolladores a entender cómo funciona la clase y cómo pueden usarla en su propio código.

### Global Filter Exception

---

```tsx
import { Request, Response, NextFunction } from 'express';
import { DatabaseException } from '../database';
import { HttpException, InternalServerError, SuccessException } from '../http';
import { ValidationException } from '../validations';

export function GlobalFilterExceptions(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(err);

	if (err instanceof SuccessException) {
		res.status(err.statusCode).json(err.response());
	}

	if (err instanceof ValidationException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	if (err instanceof DatabaseException) {
		res.status(err.statusCode).json(err.toDbJSONApi());
	}

	if (err instanceof HttpException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	const serverError = new InternalServerError('Something is Wrong');
	res.status(serverError.statusCode).json(serverError.toJSONApi());
}
```

La función `GlobalFilterExceptions` es una función que se utiliza como middleware en una aplicación Node.js que utiliza Express. Esta función acepta cuatro argumentos: `err`, `req`, `res`, y `next`.

La función se encarga de manejar diferentes tipos de excepciones que pueden ocurrir en la aplicación y enviar una respuesta HTTP apropiada al cliente.

Si la excepción es una instancia de `SuccessException`, la función envía una respuesta HTTP con el código de estado y el cuerpo de la respuesta devueltos por el método `response()` de la excepción.

Si la excepción es una instancia de `ValidationException`, la función envía una respuesta HTTP con el código de estado y el cuerpo de la respuesta devueltos por el método `toJSONApi()` de la excepción.

Si la excepción es una instancia de `DatabaseException`, la función envía una respuesta HTTP con el código de estado y el cuerpo de la respuesta devueltos por el método `toDbJSONApi()` de la excepción.

Si la excepción es una instancia de `HttpException`, la función envía una respuesta HTTP con el código de estado y el cuerpo de la respuesta devueltos por el método `toJSONApi()` de la excepción.

Si la excepción no es ninguna de las anteriores, la función envía una respuesta HTTP con un código de estado 500 (Error del servidor interno) y un mensaje de error predeterminado.

En resumen, la función `GlobalFilterExceptions` es una función que se utiliza para manejar excepciones en una aplicación Node.js y enviar una respuesta HTTP apropiada al cliente.

## English

---

# Exceptions

To ensure that your application can handle errors effectively, it is important to have a consistent and well-documented approach to handling exceptions. In this document, we will discuss some best practices for handling exceptions in Node.js applications, including how to create custom exception classes and how to handle exceptions using middleware.

## Custom Exception Classes

In a Node.js application, you can create custom exception classes to represent different types of errors that can occur in your application. By creating custom exception classes, you can provide additional information about the error and make it easier to handle the error in your code.

When creating a custom exception class, you should consider what information would be most useful to developers who will be working with the code. Some properties that you might include in a custom exception class could include:

- A timestamp and detailed description of the error
- The type of error (e.g. "validation", "authentication", etc.)
- The name of the function or method that threw the exception
- Any additional relevant information that could help developers debug the issue

These properties can be added as key-value pairs to the object returned by the `toJSON()` method of the `HttpException` class.

To get the name of the function or method that threw the exception, you can use the `stack` property of the exception object. The `stack` property contains a stack trace, which includes information about the origin of the exception, including the name of the function or method that threw it.

For example, you can use the following expression to get the name of the function or method that threw the exception:

```
const functionName = (new Error()).stack.split('\\\\n')[2].trim().split(' ')[1];

```

This expression creates a new instance of the `Error` class, captures the stack trace, extracts the third line of the stack trace (which contains information about the function or method that threw the exception), and then extracts the name of the function or method from that line.

Note that this technique only works if the exception was thrown within the same TypeScript file that is calling the expression. If the exception was thrown in another file, the stack trace may be different and the name of the function or method will not be on the same line.

### Documentation

```tsx
/**
 * Custom class for HTTP exceptions.
 */
import { HttpStatus } from '../../enums';

export class HttpException extends Error {
	readonly statusCode: number;

	/**
	 * Constructor for the HttpException class.
	 * @param message Error message.
	 * @param statusCode HTTP status code.
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.name = HttpStatus[statusCode];
	}

	/**
	 * Returns an object with information about the exception.
	 * @returns Object with the name, details, and status of the exception.
	 */
	public toJSON() {
		return {
			name: this.name,
			details: this.message,
			status: this.statusCode,
		};
	}

	/**
	 * Returns an object with an array that contains the result of the `toJSON` method.
	 * @returns Object with an array that contains the result of the `toJSON` method.
	 */
	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}

```

The `HttpException` class is a custom class for handling HTTP exceptions in Node.js applications written in TypeScript. This class extends the `Error` class and has the following properties and methods:

- `statusCode`: a number that represents the HTTP status code of the exception.
- `constructor`: a method that accepts an error message and an HTTP status code as arguments and assigns these values to the corresponding properties of the instance.
- `toJSON`: a method that returns an object with information about the exception, including the name, details, and status of the exception.
- `toJSONApi`: a method that returns an object with an array that contains the result of the `toJSON` method.

To use the `HttpException` class, simply create a new instance of the class with an error message and an HTTP status code, and then throw the exception in your code. For example:

```tsx
throw new HttpException('Could not find the requested resource.', HttpStatus.NOT_FOUND);

```

To handle the exception, you can catch it in a `try...catch` block and then call the `toJSONApi` method to get an object that you can send as a response to the HTTP request. For example:

```tsx
try {
    // Code that might throw an HttpException
} catch (error) {
    res.status(error.statusCode).json(error.toJSONApi());
}

```

By documenting the `HttpException` class, relevant information about the purpose of the class and how it can be used in the application has been added. This helps other developers understand how the class works and how they can use it in their own code.

### Database Exception

---

```tsx
export class DatabaseException extends HttpException {
	public readonly type: string;
	public readonly statusCode: number;
	public readonly field?: string;

	constructor({
		message,
		type,
		httpCode,
		field,
	}: DatabaseExceptionConstructor) {
		super(message, httpCode);
		this.type = type;
		this.statusCode = httpCode;
		this.field = field;
	}

	public toDbJSON() {
		return {
			...super.toJSON(),
			...(this.field && { field: this.field }),
			type: this.type,
		};
	}

	public toDbJSONApi() {
		return { errors: [this.toDbJSON()] };
	}
}

```

In the `DatabaseException` class, you can see that it extends the `HttpException` class. It has a constructor that accepts an object with the following properties: `message`, `type`, `httpCode`, and `field`. It then calls the constructor of the `HttpException` class with the `message` and
`httpCode` properties, and assigns the `type` and `field` properties to the instance.

The `DatabaseException` class also has two methods: `toDbJSON` and `toDbJSONApi`. Both methods return an object that contains information about the exception. The `toDbJSON` method returns an object with the same properties as the `toJSON` method of the `HttpException` class, as well as the `type` and `field` properties of the instance. The `toDbJSONApi` method returns an object with an array that contains the result of the `toDbJSON` method.

To use the `DatabaseException` class, you can create a new instance of the class with an object that has the necessary properties, and then throw the exception in your code. For example:

```tsx
throw new DatabaseException({
    message: 'Error connecting to the database.',
    type: 'DatabaseConnectionError',
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
});

```

To handle the exception, you can catch it in a `try...catch` block and then call the `toDbJSONApi` method to get an object that you can send as a response to the HTTP request. For example:

```tsx
try {
    // Code that might throw a DatabaseException
} catch (error) {
    res.status(error.statusCode).json(error.toDbJSONApi());
}

```

In the `DatabaseException` class, you can add more properties and methods as needed to provide additional information about the exception. You can also modify the `toDbJSON` and `toDbJSONApi` methods to include these new properties.

When creating a new instance of the `DatabaseException` class, you should provide a meaningful message that describes the error that occurred, as well as an appropriate `type` and `httpCode` value. The `field` property is optional and can be used to provide additional information about the specific field in the database that caused the error.

### Validation Exception

---

```tsx
import { ValidationError } from '@apideck/better-ajv-errors';
import { HttpStatus } from '../../enums';

export class ValidationException {
	statusCode: number;

	constructor(private readonly errors: ValidationError[]) {
		this.statusCode = 422;
	}

	public toJSON() {
		return this.errors.map((error) => {
			const details = error.message;
			const type = error.context.errorType;
			const suggestion = error.suggestion;
			const path = error.path;

			if (type === 'required') {
				return {
					status: this.statusCode,
					name: HttpStatus[this.statusCode],
					details,
					type,
					suggestion,
					field: details.split(' ')[5]?.slice(1, -1) || path,
				};
			}

			return {
				status: this.statusCode,
				name: HttpStatus[this.statusCode],
				details,
				type,
				suggestion,
				field: error.path.split('.')[1],
			};
		});
	}

	public toJSONApi() {
		return { errors: this.toJSON() };
	}
}

```

The `ValidationException` class is a custom class for handling validation exceptions in Node.js applications that use `better-ajv-errors`. This class does not extend the `HttpException` class like the previous exceptions.

The constructor of the class accepts an array of `ValidationError` objects and assigns a value to the `statusCode` property. The `ValidationException` class has two public methods: `toJSON` and `toJSONApi`. Both methods return an array of objects that contains information about each validation error.

The `toJSON` method iterates over the array of `ValidationError` objects and returns an array of objects that contains information about each validation error. Each object contains properties such as the `status` (HTTP status code), `name` (name of the status code), `details` (error message), `type` (type of error), `suggestion` (suggested correction), and `field` (field that caused the validation error).

The `toJSONApi` method simply returns an object that contains an array that contains the result of the `toJSON` method.

To use the `ValidationException` class, simply create a new instance of the class with an array of `ValidationError` objects, and then throw the exception in your code. For example:

```tsx
const errors: ValidationError[] = [
    {
        message: 'The "name" field is required.',
        keyword: 'required',
        params: {
            missingProperty: 'name',
        },
        dataPath: '',
        schemaPath: '#/required',
        context: {
            key: null,
            label: 'name',
            message: 'The "name" field is required.',
            value: undefined,
            schema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                },
                required: ['name'],
                additionalProperties: false,
            },
            parentSchema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                },
                required: ['name'],
                additionalProperties: false,
            },
            errorType: 'required',
            path: '',
            ...,
        },
        ...,
    },
    ...,
];

throw new ValidationException(errors);

```

To handle the exception, you can catch it in a `try...catch` block and then call the `toJSONApi` method to get an object that you can send as a response to the HTTP request. For example:

```tsx
try {
    // Code that might throw a ValidationException
} catch (error) {
    res.status(error.statusCode).json(error.toDbJSONApi());
}

```

By documenting the `ValidationException` class, relevant information about the purpose of the class and how it can be used in the application has been added. This helps other developers understand how the class works and how they can use it in their own code.

### Global Filter Exception

---

```tsx
import { Request, Response, NextFunction } from 'express';
import { DatabaseException } from '../database';
import { HttpException, InternalServerError, SuccessException } from '../http';
import { ValidationException } from '../validations';

export function GlobalFilterExceptions(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(err);

	if (err instanceof SuccessException) {
		res.status(err.statusCode).json(err.response());
	}

	if (err instanceof ValidationException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	if (err instanceof DatabaseException) {
		res.status(err.statusCode).json(err.toDbJSONApi());
	}

	if (err instanceof HttpException) {
		res.status(err.statusCode).json(err.toJSONApi());
	}

	const serverError = new InternalServerError('Something is Wrong');
	res.status(serverError.statusCode).json(serverError.toJSONApi());
}

```

The `GlobalFilterExceptions` function is a function that is used as middleware in a Node.js application that uses Express. This function accepts four arguments: `err`, `req`, `res`, and `next`.

The function is responsible for handling different types of exceptions that can occur in the application and sending an appropriate HTTP response to the client.

If the exception is an instance of `SuccessException`, the function sends an HTTP response with the status code and body returned by the `response()` method of the exception.

If the exception is an instance of `ValidationException`, the function sends an HTTP response with the status code and body returned by the `toJSONApi()` method of the exception.

If the exception is an instance of `DatabaseException`, the function sends an HTTP response with the status code and body returned by the `toDbJSONApi()` method of the exception.

If the exception is an instance of `HttpException`, the function sends an HTTP response with the status code and body returned by the `toJSONApi()` method of the exception.

If the exception is none of the above, the function sends an HTTP response with a status code of 500 (Internal Server Error) and a default error message.

In summary, the `GlobalFilterExceptions` function is a function that is used to handle exceptions in a Node.js application and send an appropriate HTTP response to the client.