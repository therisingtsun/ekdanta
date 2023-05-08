export class TaskItem {
	description: string;
	private __completed = false;

	constructor(config: Partial<TaskItem>) {
		this.description = config.description ?? "";
	}

	get completed() {
		return this.__completed;
	}

	complete() {
		this.__completed = true;
	}

	incomplete() {
		this.__completed = false;
	}
}

export class Task {
	title: string;
	created: Date;
	description: string;
	items: TaskItem[];
	deadline: Date | null;
	private __completed = false;

	constructor(config: Partial<Task> = {}) {
		this.title = config.title ?? "New Task";
		this.created = config.created ?? new Date();
		this.description = config.description ?? "";
		this.items = config.items ?? [];
		this.deadline = config.deadline ?? null;
	}

	get completed() {
		return this.__completed || this.items.every(item => item.completed);
	}

	complete() {
		this.__completed = true;
	}

	incomplete() {
		this.__completed = false;
	}

	countCompleted() {
		return this.items.filter(item => item.completed).length;
	}
}

export default Task;