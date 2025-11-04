export class UpdateTaskUseCase {
	constructor(repo, queue) { this.repo = repo; this.queue = queue; }
	async execute(id, data) {
		const updated = await this.repo.update(id, data);
		if (updated?.dueDate) {
			const diff = new Date(updated.dueDate) - new Date();
			if (diff > 0 && diff <= 86400000)
				await this.queue.publish('task_due_soon', JSON.stringify(updated));
		}
		return updated;
	}
}
