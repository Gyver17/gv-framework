# App

The `GvServer` class is a wrapper around the Express.js library for creating and configuring a web server. The class has several methods that allow configuring the server instance with middleware, template engines, routes, and global exception filters.

The `useGlobalFilters(filter)` method allows setting a custom global exception filter for the server, by default, the `GlobalFilterExceptions` of the Gv Framework is used.

The `engine(ext, callback)` method registers a template engine function for a given file type.

The `use([path,] callback [, callback...])` method adds middleware to the server instance.

The `set(name, value)` method sets a configuration for the server instance.

The `loadRoutes(prefix, routes)` method adds several routes to the server instance under a given prefix.

The `create()` method configures the server instance with JSON and URL encoded body parsers (`express.json()`, `express.urlencoded({ extended: true })`), global exception filters, and returns the configured server instance.

### Example

Sure! Here's an example of how you could use `GvServer` to create and run a simple web server:

```tsx
import { GvServer } from 'gv-framework';
import express from 'express';

const server = new GvServer();

// Set a configuration value for the server
server.set('port', 3000);

// Add a custom global exception filter
server.useGlobalFilters((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Internal Server Error');
});

// Create the Gv app and start listening on the configured port
const app = server.create();
const port = server.get('port');

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
```

In this example, we create a new `GvServer` instance and configure it with a port number and custom global exception filter.

Once the server is running, you should be able to navigate to `http://localhost:3000` (assuming you used port 3000 in the example) and see the message "Hello, world!" displayed in your browser.
