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
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [selectedModality, setSelectedModality] = useState('');

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

    // Client-side filtering + searching
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = items.filter((exercise) => {
        if (selectedCategory && exercise.category !== selectedCategory) return false;
        if (selectedMuscle && exercise.primaryMuscle !== selectedMuscle) return false;
        if (selectedEquipment && exercise.equipment !== selectedEquipment) return false;
        if (selectedModality && exercise.modality !== selectedModality) return false;
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

    // Convert Categories and Muscles to 'capitalize' style for display
    const formatLabel = (value: string) =>
        value
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());

    const categories = Array.from(new Set(items.map(e => e.category))).map(value => ({
        value,
        label: formatLabel(value),
    }));
    const muscles = Array.from(new Set(items.map(e => e.primaryMuscle))).map(value => ({
        value,
        label: formatLabel(value),
    }));

    return (
        <div className="mt-10 mb-40 px-6 text-white mx-auto max-w-6xl flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-semibold text-center w-full">Exercises</h2>
            <p className="text-lg text-center mb-4">Find the perfect exercise for your workout.</p>
            <div className="sticky top-4 sm:top-6 z-20 w-full max-w-2xl">
                {/* Search bar */}

                <div className="rounded-2xl max-w-lg mx-auto bg-white/10 p-2 mb-5">
                    <label htmlFor="exercise-search" className="text-sm text-white/80 px-1">
                        Looking for something specific?
                    </label>
                    <SearchBar value={query} onChange={setQuery} id="exercise-search" className="w-full mt-2" />
                </div>

                {/* Dropdown filters */}
                <div className="mt-2 mb-4 flex flex-wrap gap-4 justify-center">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded p-3 bg-white/20 text-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    {/* Primary Muscle Filter */}
                    <select
                        value={selectedMuscle}
                        onChange={(e) => setSelectedMuscle(e.target.value)}
                        className="rounded p-2 bg-white/20 text-white"
                    >
                        <option value="">All Muscles</option>
                        {muscles.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    {/* Equipment Filter */}
                    <select
                        value={selectedEquipment}
                        onChange={(e) => setSelectedEquipment(e.target.value)}
                        className="rounded p-2 bg-white/20 text-white"
                    >
                        <option value="">All Equipment</option>
                        {[...new Set(items.map((e) => e.equipment).filter((eq): eq is string => Boolean(eq)))]
                            .map((equipment) => (
                                <option key={equipment} value={equipment}>{equipment}</option>
                            ))}
                    </select>

                    {/* Modality Filter */}
                    <select
                        value={selectedModality}
                        onChange={(e) => setSelectedModality(e.target.value)}
                        className="rounded p-2 bg-white/20 text-white"
                    >
                        <option value="">All Modalities</option>
                        {[...new Set(items.map((e) => e.modality).filter((eq): eq is string => Boolean(eq)))]
                            .map((modality) => (
                                <option key={modality} value={modality}>{modality}</option>
                            ))}
                    </select>
                </div>
            </div>

            {loading && <div className="opacity-70">Loading…</div>}

            {!loading && filtered.length === 0 && (
                <div className="opacity-70">No results found</div>
            )}

            {filtered.map(e => (
                <div
                    key={e.id}
                    className="items-center border rounded p-3 bg-white/30 w-full max-w-2xl"
                >
                    <div className="font-medium">{e.name}</div>
                    <div className="text-sm opacity-70 capitalize">
                        {formatLabel(e.category)} • {formatLabel(e.primaryMuscle)}
                        {e.equipment ? ` • ${formatLabel(e.equipment)}` : ''}
                        {e.modality ? ` • ${formatLabel(e.modality)}` : ''}
                        <div className="mt-1 text-xs italic">
                            {e.description ? ` ${e.description}` : ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
