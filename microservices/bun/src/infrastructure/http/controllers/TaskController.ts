import { z } from 'zod';
import { CreateTaskUseCase } from '@/application/use_cases/CreateTaskUseCase.ts';
import { GetTasksUseCase } from '@/application/use_cases/GetTasksUseCase.ts';
import { GetTaskByIdUseCase } from '@/application/use_cases/GetTaskByIdUseCase.ts';
import { UpdateTaskUseCase } from '@/application/use_cases/UpdateTaskUseCase.ts';
import { DeleteTaskUseCase } from '@/application/use_cases/DeleteTaskUseCase.ts';
import { TaskProps } from '@/domain/entities/Task.ts';

const TaskCreateSchema = z.object({
	title: z.string().min(1, 'title обязателен'),
	description: z.string().optional(),
	dueDate: z.coerce.date().optional(),
	status: z.enum(['pending', 'completed']).optional(),
});

const TaskUpdateSchema = TaskCreateSchema.partial();

type CtxCreate = { body: TaskProps };
type CtxGetAll = { query?: { status?: 'pending' | 'completed' } };
type CtxGetById = { params: { id: string } };
type CtxUpdate = { params: { id: string }; body: Partial<TaskProps> };
type CtxDelete = { params: { id: string } };

export class TaskController {
	constructor(
		private uc: {
			create: CreateTaskUseCase;
			getAll: GetTasksUseCase;
			getById: GetTaskByIdUseCase;
			update: UpdateTaskUseCase;
			delete: DeleteTaskUseCase;
		},
	) { }

	async create(ctx: CtxCreate) {
		const validated = TaskCreateSchema.parse(ctx.body);
		const task = await this.uc.create.execute(validated);
		return { success: true, task };
	}

	async getAll(ctx: CtxGetAll) {
		const tasks = await this.uc.getAll.execute(
			ctx.query?.status ? { status: ctx.query.status } : {},
		);
		return { tasks };
	}

	async getById(ctx: CtxGetById) {
		const id = Number(ctx.params.id);
		if (isNaN(id)) throw new Error('Некорректный ID');
		const task = await this.uc.getById.execute(id);
		return { task };
	}

	async update(ctx: CtxUpdate) {
		const id = Number(ctx.params.id);
		if (isNaN(id)) throw new Error('Некорректный ID');
		const validated = TaskUpdateSchema.parse(ctx.body);
		const updated = await this.uc.update.execute(id, validated);
		return { updated };
	}

	async delete(ctx: CtxDelete) {
		const id = Number(ctx.params.id);
		if (isNaN(id)) throw new Error('Некорректный ID');
		await this.uc.delete.execute(id);
		return { success: true };
	}
}
