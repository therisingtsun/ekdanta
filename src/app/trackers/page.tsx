"use client";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
} from "@/types/HabitsList";
import BottomNav from "../components/BottomNav";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Tracker from "../components/Tracker";
import { HabitDialog } from "../components/Tracker/Modal";
const habits: HabitStructure[] = [
	{
		id: uuid(),
		title: "New Habit",
		created: new Date(),
		goal: "Perform n times",
		record: [
			{
				date: new Date(),
				performed: false,
			},
		],
	},
];

export default () => {
	const [state, setState] = useState(habits);
	const [openHabitDialog, setOpenHabitDialog] = useState(false);

	const handleHabitSubmit = (habit: HabitStructure) => {
		setState([...state, habit]);
	};

	const handleHabitUpdate = (habit: HabitStructure, ifRemove: boolean) => {
		const i = state.findIndex((t) => t.id === habit.id);
		if (i > -1) {
			if (!ifRemove) state[i] = habit;
			else state.splice(i, 1);
			setState([...state]);
		}
	};
	console.log(state);

	return (
		<>
			<h1>Trackers</h1>
			<HabitDialog
				init={() => {
					return {
						id: uuid(),
						title: "",
						created: new Date(),
						goal: "",
						record: [],
					};
				}}
				openHabitDialog={openHabitDialog}
				setOpenHabitDialog={setOpenHabitDialog}
				onSubmit={handleHabitSubmit}
			/>
			<main>
				{state.map((habit, i) => (
					<Tracker
						key={i}
						habit={habit}
						onUpdate={handleHabitUpdate}
					/>
				))}
			</main>
			<BottomNav />
		</>
	);
};
