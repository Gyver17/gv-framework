import { GvRouter } from '../dist';
import { z } from 'zod';

// const app = new GvServer();

// app.(5000, () => {
// 	console.log('Server on port', 5000);
// });

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
			controller: async ({ res, req }) => {
				const data = req.only(['name', 'age']);
				const schema = z.object({
					name: z.string().min(3).max(255),
					age: z.number().min(18).max(100),
				});

				const result = req.validate(schema);

				res.success(result, '200', data);
			},
		},
	],
});
