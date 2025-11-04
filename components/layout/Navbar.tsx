// Responsive Navbar component

export default function Navbar() {
	return (
		<nav className="bg-zinc-500/30 p-7 backdrop-blur-md fixed top-0 w-full z-50 rounded-b-lg border border-b-white shadow-md shadow-white/50">
			<div className="w-full flex justify-between items-center">
				<h1 className="text-white text-2xl tracking-widest">Forge</h1>
				<ul className="flex space-x-4">
					<li>
						<a href="#" className="text-white hover:underline">
							Home
						</a>
					</li>
					<li>
						<a href="#" className="text-white hover:underline">
							About Us
						</a>
					</li>
					<li>
						<a href="#" className="text-white hover:underline">
							Contact
						</a>
					</li>
					<li>
						<a href="/exercises" className="text-white hover:underline">
							Exercises
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
