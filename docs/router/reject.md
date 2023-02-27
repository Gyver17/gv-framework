# reject

The `reject` object contains several methods for throwing custom HTTP exceptions. Each method corresponds to a specific HTTP status code and will throw an exception with the specified error message. For example, the `badRequest` method will throw a `BadRequest` exception with the specified message and the status code 400. The methods and corresponding exceptions are:

- `badRequest`: `BadRequest` (400)
- `unauthorized`: `Unauthorized` (401)
- `forbidden`: `Forbidden` (403)
- `notFound`: `NotFound` (404)
- `conflict`: `Conflict` (409)
- `gone`: `Gone` (410)
- `payloadTooLarge`: `PayloadTooLarge` (413)
- `unprocessableEntity`: `UnprocessableEntity` (422)

Here's an example using the `notFound` method:

```tsx
import { ControllerParams } from 'gv-framework';

function findUserById({ req, reject, success }: ControllerParams) {
	const id = req.params.id
  const user = // find user by id
  if (!user) {
    reject.notFound(`User with id ${id} not found`);
  }

  success(user)
}
```

In this example, if the user is not found in the database, a `NotFound` exception with the message "User with id {id} not found" will be thrown.