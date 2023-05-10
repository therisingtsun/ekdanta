export type Streak = {
	date: Date;
	performed: Boolean;
};

export type Habit = {
	id: string;
	title: string;
	created: Date;
	goal: string;
	record: Array<Streak>;
};

export type HabitsList = Array<Habit>;
