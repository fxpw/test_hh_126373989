import { Task, TaskProps } from '../entities/Task.ts';

export abstract class TaskRepository {
	abstract create(task: Task): Promise<Task>;
	abstract findAll(filter?: Partial<TaskProps>): Promise<Task[]>;
	abstract findById(id: number): Promise<Task | null>;
	abstract update(id: number, data: Partial<TaskProps>): Promise<Task | null>;
	abstract delete(id: number): Promise<boolean>;
}
