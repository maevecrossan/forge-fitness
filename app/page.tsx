import Image from "next/image";

// Home page component

export default function Home() {
	return (
		<div className="w-full flex min-h-screen items-center justify-center font-sans px-8">
			<main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 sm:items-start">
				<h2 className="text-5xl font-extrabold text-white sm:text-6xl">
					Forge
				</h2>
			</main>
		</div>
	);
}
