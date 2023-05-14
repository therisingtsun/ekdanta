"use client"

import { Journal } from "@/types/Journal"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material"
import { Drafts } from "@mui/icons-material"
import dayjs from "dayjs"
import { useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

export const JournalDateFormat = "dddd, MMM D, YYYY";

export default ({ journal }: {
	journal: Journal
}) => {
	const [ open, setOpen ] = useState(false)

	const displayDate = dayjs(journal.created).format(JournalDateFormat)

	return <Stack sx={{
		padding: "1rem",
		marginBottom: "2rem"
	}} gap="1rem">
		<Stack direction="row" alignItems="center" justifyContent="space-between">
			<h3 style={{ margin: 0 }}>{displayDate}</h3>
			<IconButton onClick={() => setOpen(true)} size="large" color="primary">
				<Drafts fontSize="inherit" />
			</IconButton>
		</Stack>
		<div style={{
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			overflow: "hidden"
		}}>
			{journal.description}
		</div>
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>{displayDate}</DialogTitle>
			<DialogContent>
				<ReactMarkdown children={journal.description} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)}>Close</Button>
			</DialogActions>
		</Dialog>
	</Stack>
}