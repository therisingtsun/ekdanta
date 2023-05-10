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
		title: "Evening Workout",
		created: new Date(),
		goal: "Do 100 pushups",
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
		if (habit.title.length > 0) {
			setState([
				...state,
				habit
			])
		}
	};

	const handleHabitUpdate = (habit: HabitStructure, remove?: boolean) => {
		const i = state.findIndex((t) => t.id === habit.id);
		if (i > -1) {
			if (remove) state.splice(i, 1)
			else state[i] = habit
			setState([ ...state ])
		}
	};
	console.log(state);

	return <>
		<h1>Trackers</h1>

		<main>
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
				open={openHabitDialog}
				setOpen={setOpenHabitDialog}
				onSubmit={handleHabitSubmit}
			/>
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
};
