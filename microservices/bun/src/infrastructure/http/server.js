import { Elysia } from 'elysia';
import { TypeORMTaskRepository } from '../orm/TypeORMTaskRepository.js';
import { RedisQueue } from '../redis/RedisQueue.js';
import { CreateTaskUseCase } from '../../application/use_cases/CreateTaskUseCase.js';
import { GetTasksUseCase } from '../../application/use_cases/GetTasksUseCase.js';
import { UpdateTaskUseCase } from '../../application/use_cases/UpdateTaskUseCase.js';
import { DeleteTaskUseCase } from '../../application/use_cases/DeleteTaskUseCase.js';
import { TaskController } from './controllers/TaskController.js';
import taskRoutes from './routes/task.route.js';

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

app.listen(process.env.BACKEND_PORT || 3000, () => {
	console.log(`🚀 Elysia running on port ${process.env.BACKEND_PORT || 3000}`);
});
