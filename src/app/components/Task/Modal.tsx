"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { grey } from "@mui/material/colors";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";

const buttonStyle = {
	fontFamily: "Montserrat",
	backgroundColor: grey[800],
	'&:hover': {
		backgroundColor: grey[700],
	}
};

export const TaskDialog = ({
	init,
	openTaskDialog,
	setOpenTaskDialog,
	onSubmit,
}: {
	init: () => TaskStructure;
	openTaskDialog: boolean;
	setOpenTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (task: TaskStructure) => void;
}) => {
	const [ state, setState ] = useState<TaskStructure>(init())

	return <>
		<Button variant="contained" sx={buttonStyle} onClick={() => {
			setOpenTaskDialog(true)
			setState(init())
		}}>
			Add Task
		</Button>
		<Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)}>
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
						fullWidth variant="standard"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setState({
								...state,
								description: event.target.value.trim()
							})
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenTaskDialog(false)}>
						Cancel
					</Button>
					<Button type="submit" onClick={() => setOpenTaskDialog(false)}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};

export const TaskItemDialog = ({
	init,
	openTaskItemDialog,
	setOpenTaskItemDialog,
	onSubmit,
}: {
	init: () => TaskItemStructure;
	openTaskItemDialog: boolean;
	setOpenTaskItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit: (item: TaskItemStructure) => void;
}) => {
	const [ state, setState ] = useState<TaskItemStructure>(init())

	return <>
		<Button sx={buttonStyle} variant="contained" onClick={() => {
			setOpenTaskItemDialog(true)
			setState(init())
		}}>
			Add Item
		</Button>
		<Dialog open={openTaskItemDialog} onClose={() => setOpenTaskItemDialog(false)}>
			<form onSubmit={(event) => {
				event.preventDefault()
				onSubmit(state)
			}}>
				<DialogTitle>Add Item</DialogTitle>
				<DialogContent>
					<DialogContentText>Description</DialogContentText>
					<TextField
						autoComplete="off"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setState({
								...state,
								description: event.target.value.trim()
							})
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenTaskItemDialog(false)}>
						Cancel
					</Button>
					<Button type="submit" onClick={() => setOpenTaskItemDialog(false)}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};