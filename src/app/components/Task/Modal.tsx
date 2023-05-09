"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
	Task as TaskStructure,
	TaskItem as TaskItemStructure,
} from "@/types/TasksList";
import { grey } from "@mui/material/colors";

const buttonStyle = {
	fontFamily: "Montserrat",
	backgroundColor: grey[800],
	'&:hover': {
		backgroundColor: grey[700],
	}
};

export const TaskDialog = ({
	openTaskDialog,
	setOpenTaskDialog,
	handleTaskSubmit
}: {
	openTaskDialog: boolean;
	setOpenTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
	handleTaskSubmit: (task: TaskStructure) => void;
}) => {
	const [ task, setTask ] = useState<TaskStructure>({
		title: "",
		description: "",
		items: [],
	})

	return <>
		<Button
			variant="contained"
			sx={buttonStyle}
			onClick={() => setOpenTaskDialog(true)}
		>
			Add Task
		</Button>
		<Dialog
			open={openTaskDialog}
			onClose={() => setOpenTaskDialog(false)}
		>
			<form onSubmit={(event) => {
				event.preventDefault()
				handleTaskSubmit(task)
			}}>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent>
					<DialogContentText>Title</DialogContentText>
					<TextField
						autoFocus
						autoComplete="off" margin="dense"
						fullWidth variant="standard"
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							setTask({
								...task,
								title: event.target.value
							})
						}}
					/>
					<DialogContentText>Description</DialogContentText>
					<TextField
						autoComplete="off" margin="dense"
						fullWidth variant="standard"
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							setTask({
								...task,
								description: event.target.value
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

export const SubTaskDialog = ({
	openSubTaskDialog,
	setOpenSubTaskDialog,
	handleSubTaskSubmit,
	itemList,
	setItemList,
}: {
	openSubTaskDialog: boolean;
	setOpenSubTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubTaskSubmit: (event: React.SyntheticEvent) => void;
	itemList: TaskItemStructure;
	setItemList: React.Dispatch<React.SetStateAction<TaskItemStructure>>;
}) => {
	return <>
		<Button
			sx={buttonStyle}
			variant="contained"
			onClick={() => {
				setOpenSubTaskDialog(true);
			}}
		>
			Add Item
		</Button>
		<Dialog
			open={openSubTaskDialog}
			onClose={() => {
				setOpenSubTaskDialog(false);
			}}
		>
			<form onSubmit={handleSubTaskSubmit}>
				<DialogTitle>Add Item</DialogTitle>
				<DialogContent>
					<DialogContentText>Description</DialogContentText>
					<TextField
						autoComplete="off"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						onChange={(
							event: React.ChangeEvent<HTMLInputElement>
						) => {
							const taskItem: TaskItemStructure = {
								description: event.target.value,
							};
							setItemList({ ...taskItem });
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpenSubTaskDialog(false);
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						onClick={() => {
							setOpenSubTaskDialog(false);
						}}
					>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</>
};

export default ({
	task,
	setTask,
}: {
	task: TaskStructure;
	setTask: React.Dispatch<React.SetStateAction<TaskStructure>>;
}) => {
	const [openSubTaskDialog, setOpenSubTaskDialog] = useState(false);
	const [itemList, setItemList] = useState({
		description: ""
	});

	const handleSubTaskSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		let taskList = task.items;
		taskList.push(itemList);
		setTask({
			...task,
			completed: false,
			items: [...taskList],
		});
	};

	return (
		<div>
			<SubTaskDialog
				openSubTaskDialog={openSubTaskDialog}
				setOpenSubTaskDialog={setOpenSubTaskDialog}
				handleSubTaskSubmit={handleSubTaskSubmit}
				itemList={itemList}
				setItemList={setItemList}
			/>
		</div>
	);
};
