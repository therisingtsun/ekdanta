"use client";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
	Streak,
} from "@/types/HabitsList";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./index.scss";
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
	const streakCalculator = () => {
		const maxStreak = state.record.every((record) => record.performed)
			? state.record.length
			: 0;
		console.log(maxStreak);

		return maxStreak;
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
				<Box sx={{ width: 300 }}>
					<Slider
						aria-label="Temperature"
						defaultValue={streakCalculator()}
						valueLabelDisplay="auto"
						step={7}
						marks
						min={0}
						max={7}
						value={streakCalculator()}
					/>
				</Box>
			</div>
		</div>
	);
};
