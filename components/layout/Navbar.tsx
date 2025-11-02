// Responsive Navbar component

export default function Navbar() {
	return (
		<nav className="bg-zinc-800 p-4">
			<div className="w-full flex justify-between items-center">
				<h1 className="text-white text-2xl">Forge</h1>
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
				</ul>
			</div>
		</nav>
	);
}
