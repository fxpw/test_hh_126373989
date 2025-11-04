export class TaskController {
	constructor(uc) { this.uc = uc; }
	async create(ctx) {
		const task = await this.uc.create.execute(ctx.body);
		return { success: true, task };
	}
	async getAll(ctx) {
		const tasks = await this.uc.getAll.execute(ctx.query?.status ? { status: ctx.query.status } : {});
		return { tasks };
	}
	async update(ctx) {
		const updated = await this.uc.update.execute(Number(ctx.params.id), ctx.body);
		return { updated };
	}
	async delete(ctx) {
		await this.uc.delete.execute(Number(ctx.params.id));
		return { success: true };
	}
}
