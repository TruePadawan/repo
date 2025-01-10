import type { Metadata } from "next";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

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
				<div className="px-4 py-2 flex flex-col gap-4">
					<MantineProvider defaultColorScheme="dark">
						<header className="flex justify-between">
							<h1 className="text-5xl font-bold">
								<Link href="/">REPO</Link>
							</h1>
							<AuthButton />
						</header>
						{children}
					</MantineProvider>
				</div>
			</body>
		</html>
	);
}
