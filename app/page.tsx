import Image from "next/image";
import { AuroraBackground } from '@/components/ui/shadcn-io/aurora-background';

// Home page component

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-800 font-sans dark:bg-black">
			<AuroraBackground>
				<main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
					<h1 className="text-5xl font-extrabold text-white dark:text-white sm:text-6xl">
						Forge Fitness
					</h1>
				</main>
			</AuroraBackground>
		</div>
	);
}
