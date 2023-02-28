# Exceptions

### Http Exception

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
	 * Returns an object with an array containing the result of the `toJSON` method.
	 * @returns Object with an array containing the result of the `toJSON` method.
	 */
	public toJSONApi() {
		return { errors: [this.toJSON()] };
	}
}
```

The `HttpException` class is a custom class for handling HTTP exceptions in Node.js applications. This class extends the `Error` class and has the following properties and methods:

- `statusCode`: a number representing the HTTP status code of the exception.
- `constructor`: a method that accepts an error message and an HTTP status code as arguments and assigns these values to the corresponding properties of the instance.
- `toJSON`: a method that returns an object with information about the exception, including the name, details, and status of the exception.
- `toJSONApi`: a method that returns an object with an array containing the result of the `toJSON` method.

To use the `HttpException` class, simply create a new instance of the class with an error message and an HTTP status code, and then throw the exception in your code. For example:

```tsx
throw new HttpException('Could not find the requested resource.', HttpStatus.NOT_FOUND);
```

To handle the exception, you can catch it in a `try...catch` block and then call the `toJSONApi` method to get an object that you can send as a response to the HTTP request. For example:

```tsx
try {
    // Code that may throw an HttpException
} catch (error) {
    res.status(error.statusCode).json(error.toJSONApi());
}
```

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
    message: 'Error connecting to database.',
    type: 'DatabaseConnectionError',
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
});
```

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

The `toJSON` method iterates over the array of `ValidationError` objects and returns an array of objects that contains information about each validation error. Each object contains properties like `status` (HTTP status code), `name` (name of the status code), `details` (error message), `type` (error type), `suggestion` (suggestion for correction), and `field` (field that caused the validation error).

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

The function is responsible for handling different types of exceptions that may occur in the application and sending an appropriate HTTP response to the client.

If the exception is an instance of `SuccessException`, the function sends an HTTP response with the status code and body returned by the `response()` method of the exception.

If the exception is an instance of `ValidationException`, the function sends an HTTP response with the status code and body returned by the `toJSONApi()` method of the exception.

If the exception is an instance of `DatabaseException`, the function sends an HTTP response with the status code and body returned by the `toDbJSONApi()` method of the exception.

If the exception is an instance of `HttpException`, the function sends an HTTP response with the status code and body returned by the `toJSONApi()` method of the exception.

If the exception is none of the above, the function sends an HTTP response with a 500 (Internal Server Error) status code and a default error message.

In summary, the `GlobalFilterExceptions` function is a function that is used to handle exceptions in a Node.js application and send an appropriate HTTP response to the client.