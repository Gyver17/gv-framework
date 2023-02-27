# Validator

```tsx
// @Libraries
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats'
import { betterAjvErrors } from '@apideck/better-ajv-errors';
import type { JSONSchema6 } from 'json-schema';

// @Interfaces
import { BaseValidator } from '../interfaces';
import { ValidateParams } from '../interfaces/validator/validate-params.interface';

// @Utils
import { autoBind } from '../utils';

// @Exceptions
import { ValidationException } from '../exceptions';

export class GvValidator<T> implements BaseValidator {
	private ajv: Ajv;

	constructor(private readonly schema: JSONSchemaType<T>) {
		this.ajv = addFormats(new Ajv({ allErrors: true }));
		autoBind(this);
	}

	validate({ req, res }: ValidateParams): T {
		const validate = this.ajv.compile(this.schema);
		const data = req.body as T;
		validate(data);

		if (validate.errors) {
			const schema = this.schema as JSONSchema6;
			const errors = betterAjvErrors({
				errors: validate.errors,
				data,
				schema,
				basePath: 'request'
			});

			throw new ValidationException(errors);
		}

		return data;
	}
}
```

El bloque de código es una clase TypeScript que define un validador utilizando la librería AJV para validar datos enviados en una solicitud HTTP. El validador recibe un esquema JSON que define la estructura de los datos a validar.

La clase tiene un método "validate" que toma un objeto "ValidateParams" con una solicitud HTTP y su respuesta. El método compila el esquema JSON utilizando AJV y valida los datos en el cuerpo de la solicitud HTTP contra el esquema. Si hay errores de validación, la función arrojará una excepción "ValidationException" con los errores de validación. Si no hay errores, la función devolverá los datos validados.

### Puede mejorar

Sí, hay varias formas en las que se podría mejorar esta clase. Algunas sugerencias incluyen:

- Agregar comentarios al código para explicar qué hace cada parte de la clase y del método "validate".
- Utilizar una interfaz para definir la estructura del esquema en lugar de "JSONSchemaType" para que sea más fácil de entender y mantener.
- Agregar más opciones de configuración para AJV, como "coerceTypes" o "removeAdditional".
- Agregar pruebas unitarias para asegurarse de que el validador funciona correctamente en diferentes escenarios.
- Cambiar el nombre de la clase de "GvValidator" a algo más descriptivo y fácil de entender.

Estas son solo algunas sugerencias, pero hay muchas más formas en las que se podría mejorar este código.

Este documento contiene una clase TypeScript que define un validador utilizando la librería AJV para validar datos que se envían en una solicitud HTTP.

La clase "GvValidator" toma un esquema JSON que define la estructura de los datos a validar. Utiliza la función "validate" para compilar el esquema JSON utilizando AJV y validar los datos en el cuerpo de la solicitud HTTP contra el esquema. Si hay errores de validación, la función arrojará una excepción "ValidationException" con los errores de validación. Si no hay errores, la función devolverá los datos validados.

Para mejorar la clase, se podrían agregar comentarios al código para explicar qué hace cada parte de la clase y del método "validate". También se podría utilizar una interfaz para definir la estructura del esquema en lugar de "JSONSchemaType" para que sea más fácil de entender y mantener. Además, se podrían agregar más opciones de configuración para AJV, como "coerceTypes" o "removeAdditional". Agregar pruebas unitarias para asegurarse de que el validador funciona correctamente en diferentes escenarios también es una buena práctica. Finalmente, se podría cambiar el nombre de la clase de "GvValidator" a algo más descriptivo y fácil de entender.

La clase es útil para desarrolladores que necesiten validar datos enviados en solicitudes HTTP utilizando AJV.

### Ejemplo

Sure! Here's an example of how you could use the GvValidator class to validate data sent in an HTTP request:

```tsx
import { GvValidator } from './gv-validator';
import { ValidationException } from '../exceptions';

interface User {
  name: string;
  email: string;
  age: number;
}

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    age: {
      type: 'number',
      minimum: 18,
      maximum: 99,
    },
  },
  required: ['name', 'email', 'age'],
} as const;

const validator = new GvValidator<User>(schema);

app.post('/users', (req, res) => {
  try {
    const data = validator.validate({ req, res });
    // Data is valid, do something with it
  } catch (error) {
    if (error instanceof ValidationException) {
      // Data is invalid, handle the validation errors
      res.status(400).json({ errors: error.errors });
    } else {
      // Other error occurred, handle it
      res.status(500).send('Internal server error');
    }
  }
});

```

In this example, we define an interface "User" and a JSON schema that defines the structure of user data. We create an instance of the "GvValidator" class using the schema. Then, we define a route handler for an HTTP POST request to create a new user. Inside the route handler, we call the "validate" method of the validator instance with the request and response objects. If the data is valid, we can do something with it. If the data is not valid, we catch the "ValidationException" and send a 400 Bad Request response with the validation errors. If an error occurs that is not a validation error, we send a 500 Internal Server Error response.

I hope this helps! Let me know if you have any more questions.

## Tests

Sí, sería una buena práctica agregar pruebas unitarias para asegurarse de que el validador funciona correctamente en diferentes escenarios. Aquí hay un ejemplo de cómo se podrían hacer pruebas para esta clase:

```
import { GvValidator } from './gv-validator';
import { ValidationException } from '../exceptions';

describe('GvValidator', () => {
  interface User {
    name: string;
    email: string;
    age: number;
  }

  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 99,
      },
    },
    required: ['name', 'email', 'age'],
  } as const;

  const validator = new GvValidator<User>(schema);

  it('should validate valid user data', () => {
    const data = { name: 'John Doe', email: 'johndoe@example.com', age: 25 };
    expect(() => validator.validate({ req: { body: data } } as any)).not.toThrow();
  });

  it('should throw a ValidationException for invalid user data', () => {
    const data = { name: 'J', email: 'johndoeexample.com', age: 15 };
    expect(() => validator.validate({ req: { body: data } } as any)).toThrow(ValidationException);
  });
});

```

En este ejemplo, se definen las pruebas unitarias utilizando Jest. Se define una interfaz "User" y un esquema JSON que define la estructura de los datos de usuario. Se crea una instancia de "GvValidator" utilizando el esquema JSON. Luego, se definen dos pruebas unitarias: una para datos de usuario válidos y otra para datos de usuario no válidos. En la primera prueba, se espera que la función "validate" no arroje una excepción. En la segunda prueba, se espera que la función "validate" arroje una excepción "ValidationException".

Estas pruebas aseguran que el validador funciona correctamente en diferentes escenarios y ayuda a detectar errores o problemas en el código.