"use client";

import "./index.scss";

import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";
import { TaskItemDialog } from "./Modal";
import DeleteWithConfirmation from "../DeleteWithConfirmation";

export const TaskItem = ({
	item,
	onClick,
}: {
	item: TaskItemStructure;
	onClick: () => void;
}) => {
	return (
		<FormControlLabel
			className="task-item-container"
			label={item.description}
			control={
				<Checkbox
					checked={item.completed ?? false}
					onClick={onClick}
				/>
			}
		/>
	);
};

export default ({ task, onUpdate }: {
	task: TaskStructure,
	onUpdate: (task: TaskStructure, remove?: boolean) => void
}) => {
	task.created ??= new Date();

	const [state, setState] = useState(task);
	const clickHandler = () => {
		if (state.items.some((item) => !item.completed)) {
			state.items.forEach((item) => (item.completed = true));
		} else {
			state.items.forEach((item) => (item.completed = false));
		}
		if (state.items.length > 0) {
			state.completed = state.items[0].completed
		} else {
			state.completed = !state.completed
		}
		setState({ ...state });
	};
	const updateHandler = (i: number) => {
		return () => {
			state.items[i].completed = !state.items[i].completed
			onUpdate(state)
			setState({ ...state })
		};
	};
	const deleteHandler = (i: number) => {
		return () => {
			state.items.splice(i, 1)
			onUpdate(state)
			setState({ ...state })
		}
	}

	const [ openNewTaskItemDialog, setOpenNewTaskItemDialog ] = useState(false);
	const handleTaskItem = (item: TaskItemStructure) => {
		if (item.description.length > 0) {
			state.items = [ ...state.items, item ]
			setState(state)
			onUpdate(state)
		}
	}

	const completedCount = state.items.filter((item) => item.completed).length;
	
	return (
		<div className="task-container">
			<div className="task-header">
				<FormControlLabel
					label={state.title}
					control={
						<Checkbox
							checked={
								state.completed ||
								state.items.length > 0 && state.items.every((item) => item.completed)
							}
							indeterminate={
								completedCount > 0 &&
								completedCount < state.items.length
							}
							onClick={clickHandler}
						/>
					}
				/>
				<div>
					<TaskItemDialog
						init={() => {
							return {
								description: "",
								completed: false
							}
						}}
						open={openNewTaskItemDialog}
						setOpen={setOpenNewTaskItemDialog}
						onSubmit={handleTaskItem}
					/>					
					<DeleteWithConfirmation title="Delete Task" onConfirm={() => onUpdate(state, true)}/>
				</div>
			</div>
			<p>{state.description}</p>
			<ul>
				{state.items.map((item, i) => <li key={i}>
					<TaskItem item={item} onClick={updateHandler(i)} />
					<DeleteWithConfirmation title="Delete Item" onConfirm={deleteHandler(i)}/>
				</li>)}
			</ul>
		</div>
	);
};
