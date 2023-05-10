import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { DeleteForeverRounded } from "@mui/icons-material";
import { useState } from "react";

export default ({ title, onConfirm }: {
	title: string,
	onConfirm: () => void,
}) => {
	const [ open, setOpen ] = useState(false)
	
	return <>
		<IconButton color="error" size="large" title={title} onClick={() => setOpen(true)}>
			<DeleteForeverRounded fontSize="inherit" />
		</IconButton>
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Confirm Delete?</DialogTitle>
			<DialogContent>
				This action is irreversible.
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>
					Cancel
				</Button>
				<Button onClick={() => {
					setOpen(false)
					onConfirm()
				}}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	</>
}