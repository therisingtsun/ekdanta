"use client";

import { IconButton, Stack, TextField } from "@mui/material"
import { History } from "@mui/icons-material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import BottomNav from "../components/BottomNav"
import { db } from "@/utils/database";
import { Journal } from "@/types/Journal";
import { JournalDateFormat } from "../components/JournalEntry";

export default () => {
	const [ state, setState ] = useState<Journal | null>(null);

	useEffect(() => {
		db.journals
			.toArray()
			.then(journals => setState(journals.find(j => dayjs(j.created).isSame(dayjs(), "date")) ?? null))
	}, [])

	const updateHandler = async (description: string) => {
		if (state) {
			const journal: Journal = {
				...state,
				description
			}
			setState(journal)
			db.journals.update(journal.id, journal)
		} else {
			const journal: Journal = {
				id: uuid(),
				created: new Date(),
				description
			}
			setState(journal)
			db.journals.add(journal)
		}
	}

	return <>
		<h1>Journal</h1>

		<main style={{
			paddingBottom: 0
		}}>
			<Stack direction="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
				<h3 style={{ padding: "1rem", margin: 0 }}>{dayjs().format(JournalDateFormat)}</h3>
				<IconButton href="/history" size="large" color="primary">
					<History fontSize="inherit" />
				</IconButton>
			</Stack>
			<TextField
				sx={{
					"& textarea": {
						fontFamily: "monospace"
					},
					padding: "1rem"
				}}
				onChange={(e) => updateHandler(e.target.value)}
				value={state?.description ?? ""}
				multiline
				autoFocus
				minRows={10}
				maxRows={20}
				fullWidth
			/>
		</main>
		
		<BottomNav />
	</>
}