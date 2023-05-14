import Dexie, { Table } from "dexie";

import { Task } from "@/types/TasksList";
import { Habit } from "@/types/HabitsList";
import { Journal } from "@/types/Journal";

class DB extends Dexie {
	tasks!: Table<Task>
	habits!: Table<Habit>
	journals!: Table<Journal>

	constructor() {
		super("ekdantaDB")
		this.version(1).stores({
			tasks: "id, title, created, description, items, deadliine, completed",
			habits: "id, title, created, goal, record",
			journals: "id, created, description"
		})
	}
}

export const db = new DB()