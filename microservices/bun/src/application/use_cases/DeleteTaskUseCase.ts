import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';

export class DeleteTaskUseCase {
	constructor(private repo: TaskRepository) { }
	async execute(id: number) {
		return this.repo.delete(id);
	}
}
