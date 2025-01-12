import type { Metadata } from "next";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton/AuthButton";
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
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<link
					type="image/png"
					sizes="32x32"
					rel="icon"
					href="/icons8-repo-color-32.png"></link>
				<link
					rel="apple-touch-icon"
					type="image/png"
					sizes="60x60"
					href="/icons8-repo-color-60.png"></link>
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://i.imgur.com/uJrwKU1.png"
				/>
				<meta property="og:image:alt" content="REPO home page" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:image"
					content="https://i.imgur.com/uJrwKU1.png"
				/>
				<meta name="twitter:image:alt" content="REPO home page" />
				<meta name="twitter:site" content="@thetruepadawan" />
				<meta name="twitter:creator" content="@thetruepadawan" />
			</head>
			<body>
				<MantineProvider defaultColorScheme="dark">
					<div className="min-h-screen px-4 py-2 flex flex-col gap-4">
						<Notifications />
						<header className="flex justify-between">
							<h1 className="text-5xl font-bold">
								<Link href="/">REPO</Link>
							</h1>
							<AuthButton />
						</header>
						{children}
						<footer className="mt-auto flex justify-center font-bold">
							<a
								target="_blank"
								href="https://icons8.com/icon/33318/repository">
								Repo favicon by Icons8
							</a>
						</footer>
					</div>
				</MantineProvider>
			</body>
		</html>
	);
}
