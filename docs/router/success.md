# success

The `success` function takes three optional parameters:

- `data` (type: `unknown`): the data to be sent in the response. This must be a valid object. For example, if an object with user information were to be sent, that object would be the value passed as `data`.
- `statusCode` (type: `HttpSuccessStatus`, default value: `'200'`): the HTTP status code to be sent in the response. This parameter defines the HTTP response status code that will be sent to the client. The default value is `200`, which means a successful response. If a different status code were to be sent, that code would be passed as the value of this parameter.
- `additionalData` (type: `unknown`): any additional data to be sent in the response. This must be a valid object and not an array. For example, if additional information about the request were to be sent, an object with that information would be passed as the value of `additionalData`.

If `data` is not a valid object or is `null`, an error is thrown.

If `additionalData` is not a valid object, is `null`, or is an array, an error is thrown.

The method sets the HTTP status code and sends a JSON response that includes a message, the status code, the data, and any additional data provided.