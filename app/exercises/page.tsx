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
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = items.filter((exercise) => {
        if (!normalizedQuery) return true;
        return [
            exercise.name,
            exercise.category,
            exercise.primaryMuscle,
            exercise.equipment,
            exercise.modality,
            exercise.description,
        ]
            .filter(Boolean)
            .some((field) => String(field).toLowerCase().includes(normalizedQuery));
    });

    return (
        <div className="mt-20 mb-20 px-6 text-white mx-auto max-w-6xl flex flex-col items-center justify-center gap-4">
            <div className="sticky top-4 sm:top-6 z-20 w-full max-w-lg">
                <div className="rounded-2xl">
                    <SearchBar value={query} onChange={setQuery} className="w-full" />
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2 text-center w-full">Exercises</h2>

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
