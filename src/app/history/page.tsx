"use client";

import { useLiveQuery } from "dexie-react-hooks";

import BottomNav from "../components/BottomNav"
import { db } from "@/utils/database";
import JournalEntry from "../components/JournalEntry";

export default () => {
	const journals = useLiveQuery(() => db.journals.toArray())

	return <>
		<h1>History</h1>

		<main>
			{journals?.sort((a, b) => b.created.getTime() - a.created.getTime()).map(j => <JournalEntry key={j.id} journal={j} />)}
		</main>
		
		<BottomNav />
	</>
}