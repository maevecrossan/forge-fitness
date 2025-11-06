'use client';

import SearchBar from '@/components/ui/SearchBar';
import { useEffect, useState } from 'react';

type Exercise = {
    id: string;
    name: string;
    category: string;
    primaryMuscle: string;
    equipment?: string | null;
    modality?: string | null;
    description?: string | null;
};

type ApiResponse = {
    data: Exercise[];
};

export default function ExercisesPage() {
    const [items, setItems] = useState<Exercise[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Load all exercises once
    useEffect(() => {
        async function fetchExercises() {
            setLoading(true);
            const res = await fetch('/api/exercises?limit=100');
            const payload: ApiResponse = await res.json();
            setItems(payload.data);
            setLoading(false);
        }
        fetchExercises();
    }, []);

    // Client-side filtering
    const filtered = items.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="mt-20 mb-20 p-6 max-w-6xl text-white mx-auto space-y-4 flex flex-col items-center">
            <SearchBar value={query} onChange={setQuery} />
            <h2 className="text-2xl font-semibold mb-2 text-center">Exercises</h2>

            {loading && <div className="opacity-70">Loading…</div>}

            {!loading && filtered.length === 0 && (
                <div className="opacity-70">No results found</div>
            )}

            {filtered.map(e => (
                <div
                    key={e.id}
                    className="items-center border rounded p-3 bg-white/30 min-w-2xl max-w-2xl"
                >
                    <div className="font-medium">{e.name}</div>
                    <div className="text-sm opacity-70 capitalize">
                        {e.category} • {e.primaryMuscle}
                        {e.equipment ? ` • ${e.equipment}` : ''}
                        {e.modality ? ` • ${e.modality}` : ''}
                        <div className="mt-1 text-xs italic">
                            {e.description ? ` ${e.description}` : ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}