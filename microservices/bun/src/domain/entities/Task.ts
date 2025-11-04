export type TaskStatus = 'pending' | 'completed';

export interface TaskProps {
	id?: number;
	title: string;
	description?: string;
	dueDate?: Date | string | null;
	status?: TaskStatus;
}

export class Task {
	id?: number;
	title: string;
	description: string;
	dueDate: Date | null;
	status: TaskStatus;

	constructor({ id, title, description, dueDate, status }: TaskProps) {
		this.id = id;
		this.title = title;
		this.description = description ?? '';
		this.dueDate = dueDate ? new Date(dueDate) : null;
		this.status = status ?? 'pending';
	}

	isDueSoon(): boolean {
		if (!this.dueDate) return false;
		const diff = +this.dueDate - Date.now();
		return diff > 0 && diff <= 24 * 60 * 60 * 1000;
	}
}
