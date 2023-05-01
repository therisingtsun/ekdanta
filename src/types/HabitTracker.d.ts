export type Streak = {
	date: Date;
	performed: Boolean;
};

export type Habit = {
	title: string;
	created: Date;
	goal: string;
	record: Array<Streak>;
};
