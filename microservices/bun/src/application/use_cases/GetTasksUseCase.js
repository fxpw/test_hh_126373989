export class GetTasksUseCase {
	constructor(repo) { this.repo = repo; }
	async execute(filter) { return this.repo.findAll(filter); }
}
