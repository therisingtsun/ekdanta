"use client";

import "@/styles/global.scss";

import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useMemo } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale"

dayjs.extend(updateLocale)
dayjs.updateLocale("en", {
	weekStart: 1
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() => createTheme({
			palette: {
				mode: prefersDarkMode ? 'dark' : 'light',
				primary: deepOrange,
			},
			typography: {
				fontFamily: "Montserrat, sans-serif"
			}
		}),
		[prefersDarkMode],
	);

	return (
		<html lang="en">
			<head>
				<title>Ekdanta</title>
			</head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
					<body>{children}</body>
				</LocalizationProvider>
			</ThemeProvider>
		</html>
	)
}
