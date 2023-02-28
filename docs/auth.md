# GvAuth Class

The `GvAuth` class provides an interface for user authentication in an application. It uses JWT tokens to authenticate users and provides methods for logging in, registering new users, and protecting routes that require authentication.

## Methods

### `generateToken(ownerId: number): Promise<string>`

This method generates an authentication token for the user with the provided `ownerId`. The token is generated using a unique secret key automatically generated and an expiration date specified in the configuration options.

### `login<T>(find: FindMethod<T>, identifier: string, password: string, matchPassword?: MatchPassword): Promise<object>`

This method logs in to the application with the provided identifier and password. The method uses a search function to find the user in the database. If the user is found and the password matches, an authentication token is generated for that user and returned along with the user's data.

### `register<T, P>(create: CreateMethod<T, P>, data: DataRegister<P>, hashPassword?: HashPassword): Promise<object>`

This method registers a new user in the application with the provided data. The method uses a creation function to create a user record in the database. The method also uses an optional password hash function to encrypt the user's password. If a password hash function is provided, it will be used; otherwise, a salt generator function from `bcryptjs` will be used. The method returns the data of the newly registered user along with an authentication token.

### `jwtMiddleware(customHeader?: string): BaseMiddleware`

This method returns a middleware that is used to protect routes that require authentication. The middleware verifies the validity of the authentication token in the request, extracts the user's data from the token, and attaches it to the request for later use. The middleware uses the unique secret key stored in the database to verify the validity of the token. The method accepts an optional parameter specifying the custom header where the authentication token is located.

## Examples

```tsx
import { GvAuth } from './auth';

// create a GvAuth instance
const auth = new GvAuth(mySessionServices);

// log in with a username and password
const user = await auth.login(myFindMethod, 'username', 'password');

// user will contain the user data, including the generated authentication token
console.log(user);

```

In this example, we first create an instance of the `GvAuth` class using an object `mySessionServices` (which must conform to the `GvSessionServices` interface) as an argument. We then call the `login` method of the `GvAuth` instance with a `myFindMethod` object, the username, and password of the user. The `login` method will search for the user in the database using the `myFindMethod` object, check if the provided password matches the stored password, and if so, generate an authentication token for the user and return it along with the user's data.

Here is another example of how to use the `login` method of the `GvAuth` class to log in to the application:

```tsx
import { GvAuth } from './auth';

// create a GvAuth instance with
const auth = new GvAuth(mySessionServices);

// login with a username and password
const user = await auth.login(myFindMethod, 'username', 'password');

// user will contain the user data, including the generated authentication token
console.log(user);

```

In this example, we first create an instance of the `GvAuth` class using an object `mySessionServices` as an argument. We then call the `login` method of the `GvAuth` instance with a `myFindMethod` object, the username, and password of the user. The `login` method will search for the user in the database using the `myFindMethod` object, check if the provided password matches the stored password, and if so, generate an authentication token for the user and return it along with the user's data.

And finally, an example of how to use the `generateToken` and `register` methods of the `GvAuth` class to generate an authentication token and register a new user in the application:

```tsx
import { GvAuth } from './auth';

// create a GvAuth instance
const auth = new GvAuth(mySessionServices);

// generate an authentication token for the user with ownerId = 1
const token = await auth.generateToken(1);

// print the generated token
console.log(token);

// register a new user with the provided data
const newUser = await auth.register(myCreateMethod, { username: 'new_user', password: 'password' });

// newUser will contain the data of the newly registered user, including the generated authentication token
console.log(newUser);

```

In this example, we first create an instance of the `GvAuth` class using an object `mySessionServices` as an argument. We then call the `generateToken` method of the `GvAuth` instance with the `ownerId` of the user for whom we want to generate an authentication token. The `generateToken` method will generate an authentication token for the user and return it. Finally, we print the generated token to the console.

We then call the `register` method of the `GvAuth` instance with a `myCreateMethod` object and the data of the user we want to register. The `register` method will create a user record in the database using the provided creation function and encrypt the user's password using the provided password hash function or the salt generator function from `bcryptjs`. The method will return the data of the newly registered user along with an authentication token. Finally, we print the data of the newly registered user to the console.