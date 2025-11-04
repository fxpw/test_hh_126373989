import { Task } from '../../domain/entities/Task.js';

export class CreateTaskUseCase {
	constructor(repo, queue) {
		this.repo = repo;
		this.queue = queue;
	}
	async execute(data) {
		const task = new Task(data);
		const saved = await this.repo.create(task);
		if (task.isDueSoon()) {
			await this.queue.publish('task_due_soon', JSON.stringify(saved));
		}
		return saved;
	}
}
