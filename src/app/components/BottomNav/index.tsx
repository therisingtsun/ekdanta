'use client';

import { usePathname, useRouter } from "next/navigation"
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

const paths = [
	{ href: "/trackers", text: "Trackers" },
	{ href: "/", text: "Today" },
	{ href: "/journal", text: "Journal" },
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
		paths.map(({ text }, i) => <BottomNavigationAction sx={{
			textTransform: "uppercase",
			fontWeight: 600,
			"&.Mui-selected": {
				fontWeight: 900
			}
		}} key={i} label={text} />)
	}</BottomNavigation>
}