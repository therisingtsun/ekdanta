export type SubTask = {
	title: string;
	finished: boolean;
};

export type Task = {
	title: string;
	created: Date;
	desc: string;
	subtasks: Array<SubTask>;
	deadline: Date;
	finished: boolean;
};

export type TasksList = Array<Task>;
