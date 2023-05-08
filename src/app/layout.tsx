import "../styles/global.scss";
import "../styles/interactions.scss";

export const metadata = {
	title: 'Ekdanta'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
