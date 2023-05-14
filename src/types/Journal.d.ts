export type Journal = {
	id: string;
	created: Date;
	description: string;
};

export type JournalRecord = Array<Journal>;
