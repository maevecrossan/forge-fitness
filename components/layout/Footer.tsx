// Responsive Footer component

export default function Footer() {
	return (
		<footer className="bg-white/25 p-7 backdrop-blur-md fixed bottom-0 w-full z-50 rounded-t-lg shadow-md">
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
				</ul>
			</div>
		</footer>
	);
}
