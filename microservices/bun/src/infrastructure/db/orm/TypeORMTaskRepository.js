import { AppDataSource } from '../db/data-source.js';
import { TaskEntity } from '../db/entities/TaskEntity.js';
import TaskRepository from '../../domain/repositories/TaskRepository.js';

export class TypeORMTaskRepository extends TaskRepository {
	constructor() {
		super();
		this.repo = AppDataSource.getRepository(TaskEntity);
	}
	async create(task) {
		return await this.repo.save(task);
	}
	async findAll(filter = {}) {
		return await this.repo.find({ where: filter });
	}
	async findById(id) {
		return await this.repo.findOneBy({ id });
	}
	async update(id, data) {
		await this.repo.update(id, data);
		return await this.repo.findOneBy({ id });
	}
	async delete(id) {
		await this.repo.delete(id);
		return true;
	}
}
