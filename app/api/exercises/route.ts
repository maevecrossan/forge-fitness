import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'; // Prisma singleton
import { ExerciseCategory, MuscleGroup } from "@prisma/client";

/**
* GET /api/exercises
 * Fetch a list of exercises, optionally filtered by category and/or primary muscle group.
 * Supports infinite scrolling via cursor.
 * Query Parameters:
 *  - q: string (optional): search term to filter exercise names
 *  - category: (optional) filter by exercise category (WEIGHTS, CARDIO, etc.)
 *  - muscle: (optional) filter by primary muscle group (CHEST, BACK, etc.)
 *  - limit: (optional, default 20, max 100) number of items to return
 *  - cursor: string (optional) - last seen exercise.id; returns next page after this id
 */

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const q = (searchParams.get('q') ?? '').trim();
        const categoryRaw = (searchParams.get('category') ?? '').toUpperCase();
        const muscleRaw = (searchParams.get('muscle') ?? '').toUpperCase();

        const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? '20')));
        const cursor = searchParams.get('cursor') ?? undefined; // exercise.id of the last item client has

        // Validate enums
        const category = categoryRaw in ExerciseCategory ? (categoryRaw as keyof typeof ExerciseCategory) : undefined;
        const muscle = muscleRaw in MuscleGroup ? (muscleRaw as keyof typeof MuscleGroup) : undefined;

        const where = {
            AND: [
                q ? { name: { contains: q, mode: 'insensitive' } } : {},
                category ? { category: ExerciseCategory[category] } : {},
                muscle ? { primaryMuscle: MuscleGroup[muscle] } : {},
            ],
        };

        const findArgs: Parameters<typeof prisma.exercise.findMany>[0] = {
            where,
            orderBy: { id: 'asc' },
            take: limit,
        };

        if (cursor) {
            findArgs.cursor = { id: cursor };
            findArgs.skip = 1; // Skip the cursor item itself
        }

        const items = await prisma.exercise.findMany(findArgs);

        // Determine next cursor: last items's id if a full page was returned
        const nextCursor = items.length === limit ? items[items.length - 1]?.id ?? null : null;

        return NextResponse.json({ 
            data: items, 
            nextCursor,
            hasMore: Boolean(nextCursor),
        });
    } catch (error) {
        console.error('GET /api/exercises', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}