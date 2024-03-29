"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
} from "@/types/HabitsList";
import { db } from "@/utils/database";
import BottomNav from "../components/BottomNav";
import Tracker from "../components/Tracker";
import { HabitDialog } from "../components/Tracker/Modal";
import { useLiveQuery } from "dexie-react-hooks";

// const habits: HabitStructure[] = [
// 	{
// 		id: uuid(),
// 		title: "Evening Workout",
// 		created: new Date(),
// 		goal: "Do 100 pushups",
// 		record: [
// 			{
// 				date: new Date(),
// 				performed: false,
// 			},
// 		],
// 	},
// ];

export default () => {
	const habits = useLiveQuery(() => db.habits.toArray())

	const [openHabitDialog, setOpenHabitDialog] = useState(false);

	const handleHabitSubmit = (habit: HabitStructure) => {
		if (habit.title.length > 0) {
			db.habits.add(habit)
		}
	};

	const handleHabitUpdate = (habit: HabitStructure, remove?: boolean) => {
		const i = habits?.findIndex((t) => t.id === habit.id) ?? -1
		if (i > -1) {
			if (remove) {
				db.habits.delete(habit.id)
			} else {
				db.habits.update(habit.id, habit)
			}
		}
	};

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
			{habits?.map((habit) => (
				<Tracker
					key={habit.id}
					habit={habit}
					onUpdate={handleHabitUpdate}
				/>
			))}
		</main>

		<BottomNav />
	</>
};
