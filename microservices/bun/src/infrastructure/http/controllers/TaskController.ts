import { CreateTaskUseCase } from '@/application/use_cases/CreateTaskUseCase.ts';
import { GetTasksUseCase } from '@/application/use_cases/GetTasksUseCase.ts';
import { UpdateTaskUseCase } from '@/application/use_cases/UpdateTaskUseCase.ts';
import { DeleteTaskUseCase } from '@/application/use_cases/DeleteTaskUseCase.ts';
import { TaskProps } from '@/domain/entities/Task.ts';

type CtxCreate = { body: TaskProps };
type CtxGetAll = { query?: { status?: 'pending' | 'completed' } };
type CtxUpdate = { params: { id: string }; body: Partial<TaskProps> };
type CtxDelete = { params: { id: string } };

export class TaskController {
  constructor(private uc: {
    create: CreateTaskUseCase;
    getAll: GetTasksUseCase;
    update: UpdateTaskUseCase;
    delete: DeleteTaskUseCase;
  }) {}

  async create(ctx: CtxCreate) {
    const task = await this.uc.create.execute(ctx.body);
    return { success: true, task };
  }
  async getAll(ctx: CtxGetAll) {
    const tasks = await this.uc.getAll.execute(
      ctx.query?.status ? { status: ctx.query.status } : {}
    );
    return { tasks };
  }
  async update(ctx: CtxUpdate) {
    const id = Number(ctx.params.id);
    const updated = await this.uc.update.execute(id, ctx.body);
    return { updated };
  }
  async delete(ctx: CtxDelete) {
    const id = Number(ctx.params.id);
    await this.uc.delete.execute(id);
    return { success: true };
  }
}
