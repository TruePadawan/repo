import type { Metadata } from "next";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import "./globals.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
	title: "REPO",
	description:
		"REPO lets you compile various resources ranging from slides, recommended texts, to online materials like videos and webpages that explain some topic relevant to a course",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body className="h-full">
				<MantineProvider defaultColorScheme="dark">
					<div className="h-full px-4 py-2 flex flex-col gap-4">
						<Notifications />
						<header className="flex justify-between">
							<h1 className="text-5xl font-bold">
								<Link href="/">REPO</Link>
							</h1>
							<AuthButton />
						</header>
						{children}
					</div>
				</MantineProvider>
			</body>
		</html>
	);
}
