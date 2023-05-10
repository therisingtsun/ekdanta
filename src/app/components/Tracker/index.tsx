"use client";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
} from "@/types/HabitsList";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default ({
	habit,
	onUpdate,
}: {
	habit: HabitStructure;
	onUpdate: (habit: HabitStructure, ifRemove: boolean) => void;
}) => {
	const [state, setState] = useState(habit);
	const clickHandler = (performed: boolean) => {
		state.record.push({
			date: new Date(),
			performed: performed,
		});
		setState({ ...state });
		onUpdate(state, false);
	};
	const updateHandler = () => {
		onUpdate(state, true);
	};
	return (
		<div className="habit-container">
			<div className="habit-header">
				<h3>{state.title}</h3>
				<p>{state.goal}</p>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						color="success"
						onClick={() => clickHandler(true)}
					>
						Success
					</Button>
					<Button
						variant="outlined"
						color="error"
						onClick={() => clickHandler(false)}
					>
						Failure
					</Button>
					<Button variant="outlined" onClick={updateHandler}>
						Remove
					</Button>
				</Stack>
			</div>
		</div>
	);
};
