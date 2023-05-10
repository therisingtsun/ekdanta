"use client";

import { useState } from "react";
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Fab
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";

import { Habit as HabitStructure } from "@/types/HabitsList";

export const HabitDialog = ({
	init, open, setOpen, onSubmit,
}: {
	init: () => HabitStructure;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (habit: HabitStructure) => void;
}) => {
	const [state, setState] = useState<HabitStructure>(init());

	return <>
		<Fab
			sx={{
				position: "fixed",
				inset: "auto auto 4rem 50%",
				translate: "-50% 0",
			}}
			size="large" color="primary"
			onClick={() => {
				setOpen(true);
				setState(init());
			}}
		>
			<AddRounded sx={{ fontSize: "4rem" }} />
		</Fab>
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit(state);
				}}
			>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent>
					<DialogContentText>Title</DialogContentText>
					<TextField
						autoFocus
						autoComplete="off"
						margin="dense"
						fullWidth
						variant="standard"
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							setState({
								...state,
								title: event.target.value.trim(),
							});
						}}
					/>
					<DialogContentText>Goal</DialogContentText>
					<TextField
						autoComplete="off"
						margin="dense"
						fullWidth
						multiline
						rows={4}
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							setState({
								...state,
								goal: event.target.value.trim(),
							});
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						type="submit"
						onClick={() => setOpen(false)}
					>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};
