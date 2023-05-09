"use client";

import { useState } from "react"
import BottomNav from "./components/BottomNav"
import Task from "./components/Task"
import { TaskDialog } from "./components/Task/Modal";
import { v4 as uuid } from "uuid";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";

const tasks: TaskStructure[] = [
	{
		id: uuid(),
		title: "New Task",
		description: "Task Description",
		items: [
			{ description: "Test 1" },
			{ description: "Test 2" },
		]
	},
	{
		id: uuid(),
		title: "Old Task",
		description: "Doneded",
		items: [
			{ description: "Testing", completed: true },
		]
	},
]

export default () => {
	const [ state, setState ] = useState(tasks)
	const [ openNewTaskDialog, setOpenNewTaskDialog ] = useState(false);

	const handleTaskSubmit = (task: TaskStructure) => {
		setState([
			...state,
			task
		])
	}
	const handleTaskUpdate = (task: TaskStructure) => {
		const i = state.findIndex(t => t.id === task.id)
		if (i > -1) {
			state[i] = task;
			setState([ ...state ])
		}
	}

	// console.log(state)

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
				openTaskDialog={openNewTaskDialog}
				setOpenTaskDialog={setOpenNewTaskDialog}
				onSubmit={handleTaskSubmit}
			/>
			{state.map((task, i) => <Task
				key={i}
				task={task}
				onUpdate={handleTaskUpdate}
			/>)}
		</main>

		<BottomNav />
	</>
}