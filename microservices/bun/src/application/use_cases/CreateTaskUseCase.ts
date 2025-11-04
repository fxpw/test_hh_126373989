import { Task } from '@/domain/entities/Task.ts';
import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';
import { RedisQueue } from '@/infrastructure/db/redis/RedisQueue.ts';

export class CreateTaskUseCase {
	constructor(private repo: TaskRepository, private queue: RedisQueue) { }

	async execute(data: ConstructorParameters<typeof Task>[0]) {
		const task = new Task(data);
		const saved = await this.repo.create(task);
		if (task.isDueSoon()) {
			await this.queue.publish('task_due_soon', JSON.stringify(saved));
		}
		return saved;
	}
}
