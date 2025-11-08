// CREDIT: Adapted from https://github.com/negomi/react-burger-menu
// Installed via npm

'use client';

import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

export default function Navbar() {
	const [open, setOpen] = useState(false);

	// Inline style API provided by 'react-burger-menu'
	const styles = {
		bmBurgerButton: { position: 'fixed', width: '24px', height: '20px', right: '20px', top: '22px' },
		bmBurgerBars: { background: 'white' },
		bmBurgerBarsHover: { opacity: 0.8 },
		bmCrossButton: { height: '24px', width: '24px' },
		bmCross: { background: 'white' },
		bmMenuWrap: { top: '0' },
		bmMenu: { background: 'rgba(37, 40, 45, 0.78)' },
		bmItemList: { padding: '2rem 1rem' },
		bmItem: { display: 'block', color: 'white', marginBottom: '1rem', textDecoration: 'none' },
		bmOverlay: { background: 'rgba(0,0,0,0.6)' }
	} as const;

	return (
		<div id="outer-container">
			<nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
				<div id="page-wrap" className="mx-auto flex items-center justify-between px-6 py-4">
					<h1 className="text-white text-2xl tracking-widest">Forge</h1>

					{/* Desktop links */}
					<ul className="hidden md:flex items-center gap-6">
						<li><a className="text-white hover:underline" href="/">Home</a></li>
						<li><a className="text-white hover:underline" href="#">About Us</a></li>
						<li><a className="text-white hover:underline" href="#">Contact</a></li>
						<li><a className="text-white hover:underline" href="/exercises">Exercises</a></li>
					</ul>
				</div>
			</nav>

				<div className="md:hidden">
					<Menu
						isOpen={open}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						styles={styles}
				>
					<a href="/" onClick={() => setOpen(false)}>Home</a>
					<a href="#" onClick={() => setOpen(false)}>About Us</a>
					<a href="#" onClick={() => setOpen(false)}>Contact</a>
					<a href="/exercises" onClick={() => setOpen(false)}>Exercises</a>
				</Menu>
			</div>

			{/* Page content spacer so the fixed navbar doesn’t cover content */}
			<div className="h-[64px]" />
		</div>
	);
}
