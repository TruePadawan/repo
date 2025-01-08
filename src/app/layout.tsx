import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
	variable: "--font-albert-sans",
	subsets: ["latin"],
});

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
    <html lang="en">
      <header>
        <h1>REPO</h1>
        
      </header>
			<body
				className={`${albertSans.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
