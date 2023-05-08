'use client';

import { usePathname } from "next/navigation"
import "./index.scss"

import Link from "next/link"

const paths = [
	{ href: "trackers", text: "Trackers" },
	{ href: "", text: "Today" },
	{ href: "journal", text: "Journal" },
]

export default () => {
	const pathname = usePathname()

	return <div className="bottom-nav">{
		paths.map(({ href, text }, i) => {
			return <Link key={i} className={"button-link " + (
				pathname.substring(1) === href ? "--active" : ""
			)} href={href}>{text}</Link>
		})
	}</div>
}