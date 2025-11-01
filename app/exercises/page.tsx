'use client';

import { useEffect, useRef, useState } from 'react';


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
  nextCursor: string | null;
  hasMore: boolean;
};

export default function ExercisesPage() {
    const [items, setItems] = useState<Exercise[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    async function loadMore() {
        if (loading || !hasMore) return;
        setLoading(true);

        const params = new URLSearchParams({ limit: '20' });
        if (cursor) params.set('cursor', cursor);

        const res = await fetch(`/api/exercises?${params.toString()}`);
        const payload: ApiResponse = await res.json();

        setItems(prev => [...prev, ...payload.data]);
        setCursor(payload.nextCursor);
        setHasMore(Boolean(payload.nextCursor));
        setLoading(false);
    }

    // Initial load
    useEffect(() => {
        loadMore();
    }, []);

    // Infinite scroll trigger
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(entries => {
            const first = entries[0];
            if (first.isIntersecting) loadMore();
        });
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [sentinelRef.current, cursor, hasMore, loading]);

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-3">
            <h1 className="text-2xl font-semibold mb-2">Exercises</h1>

            {items.map(e => (
                <div key={e.id} className="border rounded p-3">
                    <div className="font-medium">{e.name}</div>
                    <div className="text-sm opacity-70">
                        {e.category} • {e.primaryMuscle}
                        {e.equipment ? ` • ${e.equipment}` : ''}
                        {e.modality ? ` • ${e.modality}` : ''}
                    </div>
                </div>
            ))}

            {hasMore ? (
                <div ref={sentinelRef} className="py-8 text-center opacity-60">
                    {loading ? 'Loading…' : 'Scroll to load more'}
                </div>
            ) : (
                <div className="py-4 text-center opacity-60">No more results</div>
            )}
        </div>
    );
}