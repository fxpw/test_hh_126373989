export class Task {
	constructor({ id, title, description, dueDate, status }) {
		this.id = id;
		this.title = title;
		this.description = description || '';
		this.dueDate = dueDate ? new Date(dueDate) : null;
		this.status = status || 'pending';
	}
	isDueSoon() {
		if (!this.dueDate) return false;
		const diff = new Date(this.dueDate) - new Date();
		return diff > 0 && diff <= 24 * 60 * 60 * 1000;
	}
}
