import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import { TypeORMTaskRepository } from '@/infrastructure/db/orm/TypeORMTaskRepository.ts';
import { RedisQueue } from '@/infrastructure/db/redis/RedisQueue.ts';
import { RedisSubscriber } from '@/infrastructure/db/redis/RedisSubscriber.ts';
import { CreateTaskUseCase } from '@/application/use_cases/CreateTaskUseCase.ts';
import { GetTasksUseCase } from '@/application/use_cases/GetTasksUseCase.ts';
import { GetTaskByIdUseCase } from '@/application/use_cases/GetTaskByIdUseCase.ts';
import { UpdateTaskUseCase } from '@/application/use_cases/UpdateTaskUseCase.ts';
import { DeleteTaskUseCase } from '@/application/use_cases/DeleteTaskUseCase.ts';
import { TaskController } from './controllers/TaskController.ts';
import taskRoutes from './routes/task.route.ts';

const app = new Elysia().use(
	swagger({
		documentation: {
			info: {
				title: 'Tasks API',
				description: 'API сервиса задач (Bun + Elysia + TypeORM + Redis)',
				version: '1.0.1',
			},
			servers: [
				{
					url: 'http://localhost:3000',
					description: 'Local server',
				},
			],
		},
		path: '/docs',
	})
);

const repo = new TypeORMTaskRepository();
const queue = new RedisQueue(process.env.REDIS_HOST, process.env.REDIS_PORT);
const subscriber = new RedisSubscriber(process.env.REDIS_HOST, process.env.REDIS_PORT);
const controller = new TaskController({
	create: new CreateTaskUseCase(repo, queue),
	getAll: new GetTasksUseCase(repo),
	getById: new GetTaskByIdUseCase(repo),
	update: new UpdateTaskUseCase(repo, queue),
	delete: new DeleteTaskUseCase(repo),
});

taskRoutes(app, controller);

app.onError(({ code, error }) => {
	console.error('Ошибка:', error.message);
	return {
		success: false,
		error: error.message,
		code,
	};
});

subscriber.listen('task_due_soon');
const port = Number(process.env.BACKEND_PORT ?? 3000);
app.listen(port, () => console.log(`Elysia running on port ${port}`));
