import { createServer, GvRouter } from '../dist';

const app = createServer();

app.listen(5000, () => {
	console.log('Server on port', 5000);
});

const router = new GvRouter();

router.route({
	path: '/',
	method: 'get',
	controller: async ({ res }) => {
		res.send('Hello world');
	},
});

router.group({
	prefix: '/api',
	routes: [
		{
			path: '/test',
			method: 'get',
			controller: async ({ res }) => {
				res.send('Hello world');
			},
		},
	],
});
