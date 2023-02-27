# Router

The `GvRouter` class is a utility that helps define routes and route groups in an Express application. This class contains the necessary methods to define HTTP routes, and is used to define the routes of a Gv application.

The following example shows how the `GvRouter` class can be used to create HTTP routes. In this case, an instance of the `GvRouter` class is created with a `TaskController` controller, and several routes are defined using the `route` and `group` methods of the `GvRouter` class.

```tsx
import { GvRouter, ControllerParams, autoBind  } from 'gv-framework';

class TaskController {
	constructor() {
		autoBind(this);
	}

	findAll({ req, success }: ControllerParams) {
		// Logic to get tasks
		const tasks = findTasks()

		// Return successful response
		success(tasks);
	}

	findOne({ req, success, reject }: ControllerParams) {
		// Logic to get task
		const { id } = req.params
		const task = findTask(id)

		// Verify that it exists
		if(!task) reject.notFound('task not found')

		// Return successful response
		success(tasks);
	}

	create({ req, success }: ControllerParams<{ name: string }>) {
		// Logic to create task
		const newTask = req.body
		createTask(newTask)

		// Return successful response
    	success();
	}
}

const taskController = new TaskController();
const gv = new GvRouter(taskController);

gv.route({
	path: '/tasks',
	method: 'get',
	middleware: [customMiddleware],
	controllerMethod: 'findAll',
});

gv.group({
	prefix: '/tasks',
	middleware: [customMiddleware],
	routes: [
	    {
			path: '/:id',
			method: 'get',
			middleware: [otherMiddleware],
			controllerMethod: 'findOne',
	    },
	    {
			path: '/',
			method: 'post',
			controllerMethod: 'create',
		},
	],
})

export default gv;

```

Then in the main file of the application, the route can be loaded:

```tsx
import { GvServer } from 'gv-framework';
import tasks from './controllers/tasks'

const server = new GvServer();

// Set a configuration value for the server
server.set('port', 3000);

// Load routes for the server
server.loadRoutes('/api', [
	tasks,
])

// Create the Gv app and start listening on the configured port
const app = server.create();
const port = server.get('port');

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

```

You can find more information about the `success` and `reject` params in the following sections:

[success](router/success.md)

[reject](router/reject.md)