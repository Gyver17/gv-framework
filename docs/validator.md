# GvValidator

The `GvValidator` class uses the `AJV` library to validate data sent in an HTTP request. The validator receives a JSON schema that defines the structure of the data to be validated.

If there are validation errors, the function will throw a `ValidationException` exception with the validation errors. If there are no errors, the function will return the validated data.

The class was designed to work with the `Route` method of the `GvRouter` class, to simplify the validation process of an HTTP request body.

Here's an example of how to use the `GvValidator` class to validate an object with a JSON schema:

```tsx
import { GvValidator, GvRouter } from 'gv-framework';
import { MyController } from './myController'

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
};

const validator = new GvValidator<User>(schema);

const myController = new MyController()
const gv = new GvRouter(myController)

gv.route({
	path: '/user',
	method: 'post',
	validation: validator,
	controllerMethod: 'create',
});

export default gv

```

If the `validation` property is specified, the router injects the `validate` property, which would be the validated data from the request body. If it is not specified, `validate` would be `null`.

```tsx
import { ControllerParams, autoBind  } from 'gv-framework';
import { User } from './interface'

export class MyController {
	constructor() {
		autoBind(this);
	}

	create({ req, success, validate }: ControllerParams<User>) {
		// Logic to create user
		create(validate) // validate contains name, email, and age

		// Return successful response
		success();
	}
}

```

### BaseValidator

```tsx
import { Request, Response } from 'express';
import { Reject } from '../../router/utils';
import { HttpSuccessStatus } from '../../types';

interface ValidateParams {
	req: Request;
	res: Response;
	success(data: object, statusCode?: HttpSuccessStatus): void;
	reject: Reject;
	ownerId?: number;
}

interface BaseValidator<T = any> {
	validate(params: ValidateParams): T | Promise<T>;
}

```

The `BaseValidator` interface is used to define the expected behavior of any class that acts as a validator in the application. The interface defines a `validate` method that receives a `ValidateParams` object. This object contains the HTTP request and response, as well as the `success` and `reject` functions. The `success` function is used to return a successful response to the HTTP request, while the `reject` function is used to return an error response.

The interface is also generic, which means that a data type that is expected to be validated can be specified. Therefore, any class that implements this interface must provide an implementation of the `validate` method that accepts a `ValidateParams` object and returns the expected data type.

The parameters of the `ValidateParams` object are described below:

- `req`: the `request` object of `Express`.
- `res`: the `response` object of `Express`.
- `success`: a function specific to `gv-framework`, more information here [success](router/success.md)
- `reject`: a function specific to `gv-framework`, more information here [reject](router/reject.md)
- `ownerId` (optional): a user identifier that is used to validate that the user making the request has the necessary permissions to perform the requested action.

In summary, the `BaseValidator` interface is used to build custom validators to ensure integration with the `gv-framework` router.