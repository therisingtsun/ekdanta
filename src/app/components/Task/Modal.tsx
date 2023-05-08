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

export const TaskDialog = ({
	openTaskDialog,
	setOpenTaskDialog,
	handleTaskSubmit,
	state,
	setState,
}: {
	openTaskDialog: boolean;
	setOpenTaskDialog: React.Dispatch<React.SetStateAction<boolean>>;
	handleTaskSubmit: (event: React.SyntheticEvent) => void;
	state: TaskStructure;
	setState: React.Dispatch<React.SetStateAction<TaskStructure>>;
}) => {
	return (
		<>
			<Button
				variant="outlined"
				onClick={() => {
					setOpenTaskDialog(true);
				}}
			>
				Add Task
			</Button>
			<Dialog
				open={openTaskDialog}
				onClose={() => {
					setOpenTaskDialog(false);
				}}
			>
				<form onSubmit={handleTaskSubmit}>
					<DialogTitle>Add Task</DialogTitle>
					<DialogContent>
						<DialogContentText>Title</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							fullWidth
							variant="standard"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								setState({
									...state,
									title: event.target.value,
								});
							}}
						/>
						<DialogContentText>Description</DialogContentText>
						<TextField
							margin="dense"
							id="name"
							fullWidth
							variant="standard"
							onChange={(
								event: React.ChangeEvent<HTMLInputElement>
							) => {
								setState({
									...state,
									description: event.target.value,
								});
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								setOpenTaskDialog(false);
							}}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							onClick={() => {
								setOpenTaskDialog(false);
							}}
						>
							Add
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
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
	return (
		<>
			<Button
				variant="outlined"
				onClick={() => {
					setOpenSubTaskDialog(true);
				}}
			>
				Add Sub-Task
			</Button>
			<Dialog
				open={openSubTaskDialog}
				onClose={() => {
					setOpenSubTaskDialog(false);
				}}
			>
				<form onSubmit={handleSubTaskSubmit}>
					<DialogTitle>Add Task</DialogTitle>
					<DialogContent>
						<DialogContentText>Description</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
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
	);
};

export default ({
	task,
	setTask,
}: {
	task: TaskStructure;
	setTask: React.Dispatch<React.SetStateAction<TaskStructure>>;
}) => {
	const [state, setState] = useState(task);
	const [openTaskDialog, setOpenTaskDialog] = useState(false);
	const [openSubTaskDialog, setOpenSubTaskDialog] = useState(false);
	const [itemList, setItemList] = useState(task.items[0]);

	const handleTaskSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setTask({
			...state,
		});
	};
	const handleSubTaskSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		let taskList = state.items;
		taskList.push(itemList);
		setTask({
			...state,
			items: [...taskList],
		});
	};

	return (
		<div>
			<TaskDialog
				openTaskDialog={openTaskDialog}
				setOpenTaskDialog={setOpenTaskDialog}
				handleTaskSubmit={handleTaskSubmit}
				state={state}
				setState={setState}
			/>
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
