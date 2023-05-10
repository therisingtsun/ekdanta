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
	IconButton,
	Fab,
} from "@mui/material";
import { AddCircleRounded, AddRounded } from "@mui/icons-material";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";

export const TaskDialog = ({
	init, open, setOpen, onSubmit,
}: {
	init: () => TaskStructure;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (task: TaskStructure) => void;
}) => {
	const [ state, setState ] = useState<TaskStructure>(init())

	return <>
		<Fab
			sx={{
				position: "fixed",
				inset: "auto auto 4rem 50%",
				translate: "-50% 0",
			}}
			size="large" color="primary"
			onClick={() => {
				setOpen(true)
				setState(init())
			}}
		>
			<AddRounded sx={{ fontSize: "4rem" }} />
		</Fab>
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={(event) => {
				event.preventDefault()
				onSubmit(state)
			}}>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent>
					<DialogContentText>Title</DialogContentText>
					<TextField
						autoFocus
						autoComplete="off" margin="dense"
						fullWidth variant="standard"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setState({
								...state,
								title: event.target.value.trim()
							})
						}}
					/>
					<DialogContentText>Description</DialogContentText>
					<TextField
						autoComplete="off" margin="dense"
						fullWidth
						multiline rows={4}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setState({
								...state,
								description: event.target.value.trim()
							})
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button type="submit" onClick={() => setOpen(false)}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};

export const TaskItemDialog = ({
	init, open, setOpen, onSubmit,
}: {
	init: () => TaskItemStructure;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (item: TaskItemStructure) => void;
}) => {
	const [ state, setState ] = useState<TaskItemStructure>(init())

	return <>
		<IconButton onClick={() => {
			setOpen(true)
			setState(init())
		}} size="large" color="primary">
			<AddCircleRounded fontSize="inherit" />
		</IconButton>
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={(event) => {
				event.preventDefault()
				onSubmit(state)
			}}>
				<DialogTitle>Add Item</DialogTitle>
				<DialogContent>
					<DialogContentText>Description</DialogContentText>
					<TextField
						autoFocus
						autoComplete="off" margin="dense"
						fullWidth
						multiline rows={4}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setState({
								...state,
								description: event.target.value.trim()
							})
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button type="submit" onClick={() => setOpen(false)}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};