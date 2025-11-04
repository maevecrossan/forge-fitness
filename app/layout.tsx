import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuroraBackground } from '@/components/ui/aurora-background';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Forge Fitness",
	description: "Forge your fittest self with Forge Fitness - track workouts, monitor progress, and achieve your goals.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-zinc-950">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<main>
					<AuroraBackground>
						<Navbar />
						{children}
						<Footer />
					</AuroraBackground>
				</main>
			</body>
		</html>
	);
}
