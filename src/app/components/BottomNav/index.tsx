'use client';

import { usePathname, useRouter } from "next/navigation"
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { AssessmentRounded, TodayRounded, NotesRounded } from "@mui/icons-material";


const paths = [
	{ href: "/trackers", text: "Trackers", icon: <AssessmentRounded /> },
	{ href: "/", text: "Today", icon: <TodayRounded /> },
	{ href: "/journal", text: "Journal", icon: <NotesRounded /> },
]

export default () => {
	const router = useRouter()
	const pathname = usePathname()

	const index = paths.findIndex(p => p.href === pathname)

	return <BottomNavigation
		sx={{
			position: "fixed",
			inset: "auto 0 0"
		}}
		showLabels
		value={index}
		onChange={(_, value) => {
			router.push(paths[value].href)
		}}
	>{
		paths.map(({ text, icon }, i) => <BottomNavigationAction sx={{
			textTransform: "uppercase",
			fontWeight: 600,
			"&.Mui-selected": {
				fontWeight: 900
			}
		}} key={i} label={text} icon={icon} />)
	}</BottomNavigation>
}