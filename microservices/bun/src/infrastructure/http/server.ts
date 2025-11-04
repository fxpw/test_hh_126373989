import { Elysia } from 'elysia';
import { TypeORMTaskRepository } from '@/infrastructure/db/orm/TypeORMTaskRepository.ts';
import { RedisQueue } from '@/infrastructure/db/redis/RedisQueue.ts';
import { CreateTaskUseCase } from '@/application/use_cases/CreateTaskUseCase.ts';
import { GetTasksUseCase } from '@/application/use_cases/GetTasksUseCase.ts';
import { UpdateTaskUseCase } from '@/application/use_cases/UpdateTaskUseCase.ts';
import { DeleteTaskUseCase } from '@/application/use_cases/DeleteTaskUseCase.ts';
import { TaskController } from './controllers/TaskController.ts';
import taskRoutes from './routes/task.route.ts';

const app = new Elysia();

const repo = new TypeORMTaskRepository();
const queue = new RedisQueue(process.env.REDIS_HOST, process.env.REDIS_PORT);

const controller = new TaskController({
	create: new CreateTaskUseCase(repo, queue),
	getAll: new GetTasksUseCase(repo),
	update: new UpdateTaskUseCase(repo, queue),
	delete: new DeleteTaskUseCase(repo)
});

taskRoutes(app, controller);

const port = Number(process.env.BACKEND_PORT ?? 3000);
app.listen(port, () => console.log(`🚀 Elysia running on port ${port}`));
