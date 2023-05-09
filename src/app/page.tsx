"use client";

import { useState } from "react"
import BottomNav from "./components/BottomNav"
import Task from "./components/Task"
import { TaskDialog } from "./components/Task/Modal";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";

export default () => {
	const tasks: TaskStructure[] = [
		{
			title: "New Task",
			description: "Task Description",
			items: [
				{ description: "Test 1" },
				{ description: "Test 2" },
			]
		},
		{
			title: "Old Task",
			description: "Doneded",
			items: [
				{ description: "Testing", completed: true },
			]
		},
	]

	const [ state, setState ] = useState(tasks)
	const [ openNewTaskDialog, setOpenNewTaskDialog ] = useState(false);

	const handleTaskSubmit = (task: TaskStructure) => {
		setState([
			...state,
			task
		])
	}

	return <>
		<h1>Today</h1>

		<main>
			<TaskDialog openTaskDialog={openNewTaskDialog} setOpenTaskDialog={setOpenNewTaskDialog} handleTaskSubmit={handleTaskSubmit} />
			{state.map((task, i) => <Task key={i} task={task} />)}
		</main>

		<BottomNav />
	</>
}