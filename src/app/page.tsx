"use client";

import { useState } from "react"
import { v4 as uuid } from "uuid";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";
import { db } from "@/utils/database";
import BottomNav from "./components/BottomNav"
import Task from "./components/Task"
import { TaskDialog } from "./components/Task/Modal";
import { useLiveQuery } from "dexie-react-hooks";

export default () => {
	const tasks = useLiveQuery(() => db.tasks.toArray())
	const [ openNewTaskDialog, setOpenNewTaskDialog ] = useState(false);

	const handleTaskSubmit = (task: TaskStructure) => {
		if (task.title.length > 0) {
			db.tasks.add(task)
		}
	}
	const handleTaskUpdate = (task: TaskStructure, remove?: boolean) => {
		const i = tasks?.findIndex(t => t.id === task.id) ?? -1
		if (i > -1) {
			if (remove) {
				db.tasks.delete(task.id)
			} else {
				db.tasks.update(task.id, task)
			}
		}
	}

	return <>
		<h1>Today</h1>

		<main>
			<TaskDialog
				init={() => {
					return {
						id: uuid(),
						title: "",
						description: "",
						items: [],
						created: new Date(),
						deadline: null,
						completed: false,
					}
				}}
				open={openNewTaskDialog}
				setOpen={setOpenNewTaskDialog}
				onSubmit={handleTaskSubmit}
			/>
			{tasks?.map((task) => <Task
				key={task.id}
				task={task}
				onUpdate={handleTaskUpdate}
			/>)}
		</main>

		<BottomNav />
	</>
}