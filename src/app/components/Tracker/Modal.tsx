"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Habit as HabitStructure } from "@/types/HabitsList";

export const HabitDialog = ({
	init,
	openHabitDialog,
	setOpenHabitDialog,
	onSubmit,
}: {
	init: () => HabitStructure;
	openHabitDialog: boolean;
	setOpenHabitDialog: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (habit: HabitStructure) => void;
}) => {
	const [state, setState] = useState<HabitStructure>(init());

	return (
		<>
			<Button
				variant="contained"
				onClick={() => {
					setOpenHabitDialog(true);
					setState(init());
				}}
			>
				Add Habit
			</Button>
			<Dialog
				open={openHabitDialog}
				onClose={() => setOpenHabitDialog(false)}
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
							minRows={4}
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
						<Button onClick={() => setOpenHabitDialog(false)}>
							Cancel
						</Button>
						<Button
							type="submit"
							onClick={() => setOpenHabitDialog(false)}
						>
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};
