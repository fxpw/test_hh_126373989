import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';
import { RedisQueue } from '@/infrastructure/db/redis/RedisQueue.ts';
import { TaskProps } from '@/domain/entities/Task.ts';

export class UpdateTaskUseCase {
	constructor(private repo: TaskRepository, private queue: RedisQueue) { }

	async execute(id: number, data: Partial<TaskProps>) {
		const updated = await this.repo.update(id, data);
		if (updated?.dueDate) {
			const diff = +new Date(updated.dueDate) - Date.now();
			if (diff > 0 && diff <= 86400000) {
				await this.queue.publish('task_due_soon', JSON.stringify(updated));
			}
		}
		return updated;
	}
}
