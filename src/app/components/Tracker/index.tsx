"use client";

import "./index.scss";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
	Streak as StreakStructure,
} from "@/types/HabitsList";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import DeleteWithConfirmation from "../DeleteWithConfirmation";
import { IconButton, Rating } from "@mui/material";
import { CheckCircleRounded, CancelRounded, WhatshotRounded, WhatshotOutlined } from "@mui/icons-material";
import { deepOrange, grey } from "@mui/material/colors";

dayjs.extend(isoWeek)
dayjs.extend(isBetween)

export default ({
	habit,
	onUpdate,
}: {
	habit: HabitStructure;
	onUpdate: (habit: HabitStructure, remove?: boolean) => void;
}) => {
	const [state, setState] = useState(habit);

	const todayRecord = () => state.record.find(d => d.date.getDate() === new Date().getDate())
	const weekRecord = () => {
		const lastWeek = state.record.slice(-7)
		const week: StreakStructure[] = []
		const today = dayjs()
		for (let i = 0; i < 7; i++) {
			const weekday = today.isoWeekday(i + 1)
			const tracked = lastWeek.find(d => dayjs(d.date).isSame(weekday, "date"))
			if (tracked) {
				week.push(tracked)
			} else if (weekday.isBefore(today, "date")) {
				week.push({
					date: weekday.toDate(),
					performed: false
				})
			}
		}
		return week
	}
	
	const StreakView = () => {
		const week = weekRecord()
		const isStreak = week.every(({ performed }) => performed)
		const marks: (StreakStructure | null)[] = []
		for (let i = 0; i < 7; i++) {
			marks[i] = week[i] ?? null
		}
		return <div className={"weekly-streak-view"}>
			<div className="streak-header">
				Weekly Streak:
				<span className="streak-status">
					({(isStreak ? "Ongoing" : "Missed")})
				</span>
			</div>
			<div className={"streak-marks" + (isStreak ? " --streak" : "")} style={{
				borderColor: isStreak ? deepOrange[500] : grey[700]
			}}>
				{marks.map((tracked, i) => tracked?.performed
					? <WhatshotRounded key={i} sx={{
						color: deepOrange[500],
						fontSize: "2rem",
					}} />
					: <WhatshotOutlined key={i} sx={{
						fontSize: "2rem",
					}} color="disabled" />
				)}
			</div>
		</div>
	}

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
						{todayRecord()?.performed ? " (Done Today)" : ""}
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
			<StreakView />
			{/* <Rating
				sx={{
					"& .MuiRating-iconFilled": {
						color: deepOrange[500]
					}
				}}
				readOnly
				icon={<WhatshotRounded />}
				emptyIcon={<WhatshotOutlined />}
				max={7}
			/> */}
		</div>
	);
};
