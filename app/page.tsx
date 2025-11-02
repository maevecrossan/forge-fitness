import Image from "next/image";

// Home page component

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center font-sans max-w-8xl mx-auto px-8">
			<main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
				<h1 className="text-5xl font-extrabold text-white sm:text-6xl">
					Forge Fitness
				</h1>
			</main>
		</div>
	);
}
