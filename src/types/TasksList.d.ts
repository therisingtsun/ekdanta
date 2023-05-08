export type TaskItem = {
	description: string;
	completed?: boolean;
};

export type Task = {
	title: string;
	created?: Date;
	description?: string;
	items: TaskItem[];
	deadline?: Date | null;
	completed?: boolean;
};

export type TasksList = Task[];
