// Rounded searchbar component with gradient border (created by ChatGPT) and search icon

"use client";

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search exercises..."
                className="w-full rounded-full py-2 pl-10 pr-4 text-sm text-white
                    bg-white/5 backdrop-blur-md outline-none
                    border border-transparent ring-2 ring-transparent

                    [background:
                        linear-gradient(#0e0e0e,#0e0e0e) padding-box,
                        linear-gradient(135deg,#3b82f6,#a855f7,#ec4899,#f97316) border-box
                    ]

                    focus:shadow-[0_0_18px_rgba(168,85,247,0.45)]
                    transition-all duration-300
                    "
            />

            <span className="absolute left-3 top-2.5 text-white/60">
                <svg
                    className="h-4 w-4 stroke-[2]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>

                    <circle cx="11" cy="11" r="8" stroke="url(#grad)" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="url(#grad)" />
                </svg>
            </span>
        </div>
    );
}