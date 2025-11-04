import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';

export class GetTaskByIdUseCase {
	constructor(private repo: TaskRepository) {}

	async execute(id: number) {
		const task = await this.repo.findById(id);
		if (!task) {
			throw new Error(`Задача с ID ${id} не найдена`);
		}
		return task;
	}
}
