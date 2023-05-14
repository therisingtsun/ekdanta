"use client";

import "./index.scss";

import {
	Habit as HabitStructure,
	HabitsList as HabitsListStructure,
	Streak as StreakStructure,
} from "@/types/HabitsList";
import DeleteWithConfirmation from "../DeleteWithConfirmation";

import dayjs, { Dayjs } from 'dayjs';
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { CheckCircleRounded, CancelRounded, History, WhatshotRounded, WhatshotOutlined } from "@mui/icons-material";
import { deepOrange, grey } from "@mui/material/colors";
import { DateCalendar } from "@mui/x-date-pickers";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isoWeek)
dayjs.extend(isBetween)

const Day = ({ day, record, ...other }: PickersDayProps<Dayjs> & { record?: StreakStructure[] }) => {

	if (record) {
		const performed = record.find(d => dayjs(d.date).isSame(day, "date"))?.performed ?? false
		if (performed) {
			return <PickersDay
				sx={{
					backgroundColor: deepOrange[900],
					color: deepOrange[100],
					fontWeight: 700
				}}
				day={day} {...other}
			/>
		}
	}
	return <PickersDay day={day} {...other} />
}

const HabitHistory = ({
	habit, open, setOpen
}: {
	habit: HabitStructure;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return <Dialog open={open} onClose={() => setOpen(false)}>
		<DialogTitle>Streak History</DialogTitle>
		<DateCalendar
			views={[ "day" ]}
			slots={{ day: Day }}
			slotProps={{
				day: {
					record: habit.record
				} as any
			}}
			showDaysOutsideCurrentMonth
			fixedWeekNumber={6}
			readOnly
		/>
	</Dialog>
}

export default ({
	habit,
	onUpdate,
}: {
	habit: HabitStructure;
	onUpdate: (habit: HabitStructure, remove?: boolean) => void;
}) => {
	const [ state, setState ] = useState(habit);
	const [ openHistory, setOpenHistory ] = useState(false);

	const todayRecord = () => state.record.find(d => dayjs(d.date).isSame(dayjs(), "date"))
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
		const isStreak = week.slice(0, week.length - 1).every(({ performed }) => performed)
		const marks: (StreakStructure | null)[] = []
		for (let i = 0; i < 7; i++) {
			marks[i] = week[i] ?? null
		}
		const fullStreak = marks.every(m => m?.performed)
		return <div className={"weekly-streak-view"}>
			<div className="streak-header">
				Weekly Streak:
				<span className="streak-status">
					({(isStreak ? "Ongoing" : "Missed")})
				</span>
			</div>
			<div className={"streak-marks" + ((isStreak && !fullStreak) ? " --streak" : "") + (fullStreak ? " --full-streak" : "")} style={{
				borderColor: (isStreak && !fullStreak)
					? deepOrange[500]
					: fullStreak
						? grey[900]
						: grey[700],
				backgroundColor: fullStreak ? deepOrange[500] : "unset",
				outline: fullStreak ? "2px solid" : "",
				outlineColor: fullStreak ? deepOrange[200] : ""
			}}>
				{marks.map((tracked, i) => tracked?.performed
					? <WhatshotRounded key={i} sx={{
						color: deepOrange[fullStreak ? 200 : 500],
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
				performed,
			})
		}
		setState({ ...state })
		onUpdate(state)
	};

	return (
		<Stack className="habit-container" direction="column">
			<Stack className="habit-header" direction="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
				<h3 style={{ margin: 0 }}>
					{state.title}
					<span className="habit-done">
						{todayRecord()?.performed ? " (Done Today)" : ""}
					</span>
				</h3>
				<Stack direction="row" flexWrap="nowrap">
					<IconButton onClick={() => setOpenHistory(true)} size="large" color="primary">
						<History fontSize="inherit" />
					</IconButton>
					<DeleteWithConfirmation title="Delete Habit" onConfirm={() => onUpdate(state, true)} />
				</Stack>
			</Stack>
			<Stack direction="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
				<div>{state.goal}</div>
				<Stack direction="row">
					<IconButton onClick={() => clickHandler(true)} size="large" color="success">
						<CheckCircleRounded fontSize="inherit" />
					</IconButton>
					<IconButton onClick={() => clickHandler(false)} size="large" color="error">
						<CancelRounded fontSize="inherit" />
					</IconButton>
				</Stack>
			</Stack>
			<StreakView />
			<HabitHistory habit={state} open={openHistory} setOpen={setOpenHistory} />
		</Stack>
	);
};
