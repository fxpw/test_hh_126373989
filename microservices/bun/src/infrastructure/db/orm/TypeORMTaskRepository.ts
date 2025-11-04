import { AppDataSource } from '@/infrastructure/db/data-source.ts';
import { TaskEntity } from '@/infrastructure/db/entities/TaskEntity.ts';
import { Task, TaskProps } from '@/domain/entities/Task.ts';
import { TaskRepository } from '@/domain/repositories/TaskRepository.ts';
import { Repository } from 'typeorm';

export class TypeORMTaskRepository extends TaskRepository {
	private repo: Repository<TaskEntity>;

	constructor() {
		super();
		this.repo = AppDataSource.getRepository(TaskEntity);
	}

	private toEntity(task: Task): TaskEntity {
		const entity = new TaskEntity();
		if (task.id) entity.id = task.id;
		entity.title = task.title;
		entity.description = task.description ?? null;
		entity.dueDate = task.dueDate ?? null;
		entity.status = task.status;
		return entity;
	}

	private fromEntity(e: TaskEntity): Task {
		return new Task({
			id: e.id,
			title: e.title,
			description: e.description ?? undefined,
			dueDate: e.dueDate ?? undefined,
			status: e.status
		});
	}

	async create(task: Task): Promise<Task> {
		const saved = await this.repo.save(this.toEntity(task));
		return this.fromEntity(saved);
	}
	async findAll(filter: Partial<TaskProps> = {}): Promise<Task[]> {
		const where: any = {};
		if (filter.status) where.status = filter.status;
		const rows = await this.repo.find({ where });
		return rows.map(this.fromEntity);
	}
	async findById(id: number): Promise<Task | null> {
		const row = await this.repo.findOne({ where: { id } });
		return row ? this.fromEntity(row) : null;
	}
	async update(id: number, data: Partial<TaskProps>): Promise<Task | null> {
		await this.repo.update({ id }, data);
		const updated = await this.repo.findOne({ where: { id } });
		return updated ? this.fromEntity(updated) : null;
	}
	async delete(id: number): Promise<boolean> {
		await this.repo.delete({ id });
		return true;
	}
}
