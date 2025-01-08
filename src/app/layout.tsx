import type { Metadata } from "next";
import {
	Button,
	ColorSchemeScript,
	MantineProvider,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import "./globals.css";
import Link from "next/link";

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
			<body className="h-full px-4 py-2 flex flex-col gap-4">
				<MantineProvider defaultColorScheme="dark">
					<header className="flex justify-between">
						<h1 className="text-5xl font-bold">
							<Link href="/">REPO</Link>
						</h1>
						<Menu>
							<MenuTarget>
								<Button variant="light" color="gray" size="md">
									Sign in
								</Button>
							</MenuTarget>
							<MenuDropdown>
								<MenuItem leftSection={<IconBrandGoogle />}>
									Sign in with Google
								</MenuItem>
								<MenuItem leftSection={<IconBrandGithub />}>
									Sign in with Github
								</MenuItem>
							</MenuDropdown>
						</Menu>
					</header>
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
