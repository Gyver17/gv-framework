# Success

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

Sí, aquí hay algunas sugerencias para mejorar la clase `Success`:

- Utilizar el tipo `Record` en lugar de `object` para el parámetro `data` para describir mejor su estructura.
- Agregar un método estático a la clase `Success` para crear instancias de la misma. Esto puede mejorar la legibilidad y reducir la cantidad de código necesario en las rutas.
- Utilizar una enumeración en lugar de un objeto para definir los códigos de estado HTTP y los mensajes correspondientes. Esto puede evitar errores tipográficos y hacer que el código sea más fácil de entender.

Aquí hay un ejemplo de cómo se podría implementar una mejora para la clase `Success`:

```tsx
import { Response } from 'express';
import { HttpSuccessStatus } from '../../types';
import { autoBind } from '../../utils';

enum HttpStatus {
	OK = 'OK',
	CREATED = 'Created',
}

export class Success {
	private readonly res: Response;

	constructor(res: Response) {
		this.res = res;
		autoBind(this);
	}

	public static create(res: Response) {
		return new Success(res);
	}

	public response<T>(data: Record<string, T>, statusCode: HttpSuccessStatus = '200') {
		const code = parseInt(statusCode);
		this.res.status(code);
		this.res.json({
			message: HttpStatus[code] || HttpStatus.OK,
			status: code,
			data,
		});
	}
}

```

El método `response` de la clase `Success` toma dos parámetros:

1. `data`: un objeto que contiene los datos que se enviarán en la respuesta. Este parámetro es opcional, pero si se proporciona, debe ser un objeto que describa la estructura de los datos usando la sintaxis `{ [key: string]: any }`.
2. `statusCode`: un código de estado HTTP que se enviará en la respuesta. Este parámetro es opcional y tiene un valor predeterminado de `'200'`.

El método establece el código de estado HTTP de la respuesta utilizando el valor proporcionado en `statusCode`. Luego, construye un objeto JSON que contiene tres propiedades: `message`, `status` y `data`. La propiedad `message` es una cadena que describe el código de estado HTTP en términos más amigables para el usuario. La propiedad `status` es el código de estado HTTP como un número entero. La propiedad `data` es el objeto proporcionado en el parámetro `data` (si se proporciona).

Finalmente, el método envía la respuesta JSON utilizando el objeto `Response` proporcionado al constructor de la clase `Success`.

Sí, se puede agregar más información a la respuesta JSON. Por ejemplo, se pueden agregar propiedades adicionales al objeto JSON que se devuelve en el método `response`. También se pueden agregar encabezados adicionales a la respuesta utilizando el método `set` del objeto `Response`.

Aquí hay un ejemplo de cómo se podría agregar una propiedad adicional al objeto JSON que se devuelve en el método `response`:

```
public response<T>(data: Record<string, T>, statusCode: HttpSuccessStatus = '200', additionalData?: object) {
	const code = parseInt(statusCode);
	this.res.status(code);
	this.res.json({
		message: HttpStatus[code] || HttpStatus.OK,
		status: code,
		data,
		...additionalData,
	});
}

```

En este ejemplo, se ha agregado un nuevo parámetro opcional `additionalData` al método `response`. Si se proporciona, este objeto se agregará al objeto JSON que se devuelve en la respuesta. Para agregar el objeto `additionalData` al objeto JSON, se utiliza el operador de propagación (`...`).

También se pueden agregar encabezados adicionales a la respuesta utilizando el método `set` del objeto `Response`. Por ejemplo, para agregar un encabezado `X-Custom-Header` con el valor `foobar` a la respuesta, se puede hacer lo siguiente:

```
public response<T>(data: Record<string, T>, statusCode: HttpSuccessStatus = '200', additionalData?: object) {
	const code = parseInt(statusCode);
	this.res.status(code);
	this.res.set('X-Custom-Header', 'foobar');
	this.res.json({
		message: HttpStatus[code] || HttpStatus.OK,
		status: code,
		data,
		...additionalData,
	});
}

```

En este ejemplo, se ha agregado el método `set` al método `response` para agregar el encabezado `X-Custom-Header` a la respuesta. El método `set` toma dos parámetros: el nombre del encabezado y su valor.

La clase `Success` maneja respuestas exitosas en las rutas de una aplicación Node.js utilizando Express. La clase tiene un método `response` que toma un objeto `data` y un código de estado HTTP (opcional) y devuelve una respuesta JSON con los datos proporcionados.

### Constructor

`Success(res: Response)`: Crea una nueva instancia de la clase `Success`, que se utiliza para manejar respuestas exitosas en las rutas de la aplicación. Toma un parámetro `res` que es un objeto de respuesta `Response` de Express.

### Métodos

`response<T>(data: Record<string, T>, statusCode?: HttpSuccessStatus, additionalData?: object)`: Toma dos parámetros y devuelve una respuesta JSON con los datos proporcionados. El primer parámetro `data` es un objeto que contiene los datos que se enviarán en la respuesta. Este parámetro es opcional, pero si se proporciona, debe ser un objeto que describa la estructura de los datos usando la sintaxis `{ [key: string]: any }`. El segundo parámetro `statusCode` es un código de estado HTTP que se enviará en la respuesta. Este parámetro es opcional y tiene un valor predeterminado de `'200'`. El tercer parámetro `additionalData` es opcional y se utiliza para agregar propiedades adicionales al objeto JSON que se devuelve en la respuesta. Si se proporciona, este objeto se agregará al objeto JSON que se devuelve en la respuesta. Para agregar el objeto `additionalData` al objeto JSON, se utiliza el operador de propagación (`...`). También se pueden agregar encabezados adicionales a la respuesta utilizando el método `set` del objeto `Response`.

### Ejemplo

```
import { Response } from 'express';
import { HttpSuccessStatus } from '../../types';
import { autoBind } from '../../utils';

enum HttpStatus {
	OK = 'OK',
	CREATED = 'Created',
}

export class Success {
	private readonly res: Response;

	constructor(res: Response) {
		this.res = res;
		autoBind(this);
	}

	public static create(res: Response) {
		return new Success(res);
	}

	public response<T>(data: Record<string, T>, statusCode: HttpSuccessStatus = '200', additionalData?: object) {
		const code = parseInt(statusCode);
		this.res.status(code);
		this.res.set('X-Custom-Header', 'foobar');
		this.res.json({
			message: HttpStatus[code] || HttpStatus.OK,
			status: code,
			data,
			...additionalData,
		});
	}
}

```