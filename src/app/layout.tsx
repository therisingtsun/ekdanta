"use client";

import "../styles/global.scss";

import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { useMemo } from "react";

export const metadata = {
	title: 'Ekdanta'
}

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
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<body>{children}</body>
			</ThemeProvider>
		</html>
	)
}
