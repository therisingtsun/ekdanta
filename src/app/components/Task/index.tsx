"use client";

import { useState } from "react";

import { FormControlLabel } from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { grey } from "@mui/material/colors"

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure
} from "@/types/TasksList";

export const TaskItem = ({ item }: { item: TaskItemStructure }) => {
	const [ state, setState ] = useState( item )
	const clickHandler = () => {
		setState({
			...state,
			completed: !state.completed
		})
	}

	return <FormControlLabel
		className="task-item-container"
		label={item.description}
		control={<Checkbox
			sx={{
				color: grey[800],
				'&.Mui-checked': {
					color: grey[800]
				}
			}}
			checked={state.completed ?? false}
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
	

	return <div className="task-container">
		<FormControlLabel
			label={task.title}
			control={
				<Checkbox
					sx={{
						color: grey[800],
						'&.Mui-checked': {
							color: grey[800]
						}
					}}
					checked={state.completed || state.items.every(item => item.completed)}
					onClick={clickHandler}
				/>
			}
		/>
		{task.description}
		<ul>{
			task.items.map((item, i) => <li key={i}><TaskItem item={item} /></li>)
		}</ul>
	</div>
}