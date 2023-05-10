"use client";

import "./index.scss";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
} from "@/types/HabitsList";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import DeleteWithConfirmation from "../DeleteWithConfirmation";
import { IconButton } from "@mui/material";
import { CheckCircleRounded, CancelRounded } from "@mui/icons-material";

export default ({
	habit,
	onUpdate,
}: {
	habit: HabitStructure;
	onUpdate: (habit: HabitStructure, remove?: boolean) => void;
}) => {
	const [state, setState] = useState(habit);

	const todayRecord = () => state.record.find(d => d.date.getDate() === new Date().getDate())

	const clickHandler = (performed: boolean) => {
		const latestRecord = todayRecord()
		if (latestRecord) latestRecord.performed = performed
		else {
			state.record.push({
				date: new Date(),
				performed: performed,
			})
		}
		setState({ ...state })
		onUpdate(state)
	};

	return (
		<div className="habit-container">
			<div className="habit-header">
				<h3>
					{state.title}
					<span className="habit-done">
						{todayRecord()?.performed ? " (Done)" : ""}
					</span>
				</h3>
				<DeleteWithConfirmation title="Delete Habit" onConfirm={() => onUpdate(state, true)} />
			</div>
			<p>{state.goal}</p>
			<Stack direction="row" spacing={2}>
				<IconButton onClick={() => clickHandler(true)} size="large" color="success">
					<CheckCircleRounded fontSize="inherit" />
				</IconButton>
				<IconButton onClick={() => clickHandler(false)} size="large" color="error">
					<CancelRounded fontSize="inherit" />
				</IconButton>
			</Stack>
		</div>
	);
};
