import type { Elysia } from 'elysia';
import { TaskController } from '../controllers/TaskController.ts';

export default (app: Elysia, controller: TaskController) => {
	app.post('/tasks', ({ body }) => controller.create({ body }));
	app.get('/tasks', ({ query }) => controller.getAll({ query }));
	app.put('/tasks/:id', ({ params, body }) => controller.update({ params, body }));
	app.delete('/tasks/:id', ({ params }) => controller.delete({ params }));
};
