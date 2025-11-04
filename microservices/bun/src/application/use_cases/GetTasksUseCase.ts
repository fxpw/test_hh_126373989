import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';
import { TaskProps } from '@/domain/entities/Task.ts';

export class GetTasksUseCase {
	constructor(private repo: TaskRepository) { }
	async execute(filter?: Partial<TaskProps>) {
		return this.repo.findAll(filter ?? {});
	}
}
