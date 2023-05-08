"use client";

import { useState } from "react";

import { FormControlLabel, Typography } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { grey } from "@mui/material/colors"

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure
} from "@/types/TasksList";

const checkboxStyle = {
	color: grey[800],
	'&.Mui-checked, &.MuiCheckbox-indeterminate': {
		color: grey[800]
	}
}

export const TaskItem = ({ item, clickHandler }: {
	item: TaskItemStructure,
	clickHandler: () => void
}) => {
	return <FormControlLabel
		className="task-item-container"
		label={<Typography fontFamily={"Montserrat, sans-serif"}>{item.description}</Typography>}
		control={<Checkbox
			sx={checkboxStyle}
			checked={item.completed ?? false}
			onClick={clickHandler}
		/>}
	/>
}

export default ({ task }: {task: TaskStructure }) => {
	task.created ??= new Date()

	const [ state, setState ] = useState( task );
	const clickHandler = () => {
		setState({
			...state,
			completed: !state.completed
		})
	}
	const updateHandler = (i: number) => {
		return () => {
			state.items[i].completed = !state.items[i].completed
			setState({ ...state })
		}
	}

	const completedCount = state.items.filter(item => item.completed).length

	return <div className="task-container">
		<FormControlLabel
			label={<Typography fontFamily={"Montserrat, sans-serif"}>{task.title}</Typography>}
			control={<Checkbox
				sx={checkboxStyle}
				checked={state.completed || state.items.every(item => item.completed)}
				indeterminate={
					completedCount > 0 && completedCount < state.items.length
				}
				onClick={clickHandler}
			/>}
		/>
		<p>{task.description}</p>
		<ul>{
			task.items.map((item, i) => <li key={i}>
				<TaskItem item={item} clickHandler={updateHandler(i)} />
			</li>)
		}</ul>
	</div>
}