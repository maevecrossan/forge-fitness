import { ChangeEvent } from 'react';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function SearchBar({ value, onChange, placeholder, className }: SearchBarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

    return (
        <input
            type="search"
            value={value}
            onChange={handleChange}
            placeholder={placeholder ?? 'Search exercises…'}
            className={className ?? 'w-full max-w-xl rounded-md border border-white/30 bg-white/20 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/60'}
        />
    );
}