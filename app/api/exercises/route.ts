import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'; // Prisma singleton
import { Prisma, ExerciseCategory, MuscleGroup, Exercise } from "@prisma/client";

/**
* GET /api/exercises
 * Fetch a list of exercises, optionally filtered by category and/or primary muscle group.
 * Supports infinite scrolling via cursor.
 * Query Parameters:
 *  - q: string (optional): search term to filter exercise names
 *  - category: (optional) filter by exercise category (WEIGHTS, CARDIO, etc.)
 *  - muscle: (optional) filter by primary muscle group (CHEST, BACK, etc.)
 *  - modality: (optional) filter by modality string (e.g. Running, Cycling)
 *  - limit: (optional, default 20, max 100) number of items to return
 *  - cursor: string (optional) - last seen exercise.id; returns next page after this id
 */

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const q = (searchParams.get('q') ?? '').trim();
        const qUpper = q.toUpperCase();
        const categoryRaw = (searchParams.get('category') ?? '').toUpperCase();
        const muscleRaw = (searchParams.get('muscle') ?? '').toUpperCase();
        const modality = (searchParams.get('modality') ?? '').trim();

        const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') ?? '20')));
        const cursor = searchParams.get('cursor') ?? undefined; // exercise.id of the last item client has

        // Validate enums
        const category = categoryRaw in ExerciseCategory ? (categoryRaw as keyof typeof ExerciseCategory) : undefined;
        const muscle = muscleRaw in MuscleGroup ? (muscleRaw as keyof typeof MuscleGroup) : undefined;

        let items: Exercise[];

        if (q) {
            const qCategory = (Object.keys(ExerciseCategory) as Array<keyof typeof ExerciseCategory>)
                .find((k) => k === qUpper) as ExerciseCategory | undefined;
            const qMuscle = (Object.keys(MuscleGroup) as Array<keyof typeof MuscleGroup>)
                .find((k) => k === qUpper) as MuscleGroup | undefined;

            const vector = Prisma.sql`
                to_tsvector(
                    'english',
                    concat_ws(' ',
                        e.id,
                        e.name,
                        e.category::text,
                        e."primaryMuscle"::text,
                        coalesce(e.equipment, ''),
                        coalesce(e.modality, ''),
                        coalesce(e.description, '')
                    )
                )
            `;

            const likeQuery = `%${q}%`;
            const textSearch = Prisma.sql`
                (
                    ${vector} @@ plainto_tsquery('english', ${q})
                    OR e.name ILIKE ${likeQuery}
                    OR e.category::text ILIKE ${likeQuery}
                    OR e."primaryMuscle"::text ILIKE ${likeQuery}
                    OR coalesce(e.equipment, '') ILIKE ${likeQuery}
                    OR coalesce(e.modality, '') ILIKE ${likeQuery}
                    OR coalesce(e.description, '') ILIKE ${likeQuery}
                )
            `;

            const conditions: Prisma.Sql[] = [textSearch];
            if (qCategory) {
                conditions.push(Prisma.sql`e.category = ${qCategory}`);
            }
            if (qMuscle) {
                conditions.push(Prisma.sql`e."primaryMuscle" = ${qMuscle}`);
            }

            if (category) {
                conditions.push(Prisma.sql`e.category = ${category}`);
            }
            if (muscle) {
                conditions.push(Prisma.sql`e."primaryMuscle" = ${muscle}`);
            }
            if (modality) {
                conditions.push(Prisma.sql`e.modality ILIKE ${'%' + modality + '%'}`);
            }
            if (cursor) {
                conditions.push(Prisma.sql`e.id > ${cursor}`);
            }

            const whereClause = conditions.length
                ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
                : Prisma.sql``;

            const fullTextQuery = Prisma.sql`
                SELECT e.*
                FROM "Exercise" e
                ${whereClause}
                ORDER BY e.id ASC
                LIMIT ${limit}
            `;

            items = await prisma.$queryRaw<Exercise[]>(fullTextQuery);
        } else {
            const and: Prisma.ExerciseWhereInput[] = [];
            if (category) {
                and.push({ category });
            }
            if (muscle) {
                and.push({ primaryMuscle: muscle });
            }
            if (modality) {
                and.push({ modality: { contains: modality, mode: 'insensitive' } });
            }

            const where: Prisma.ExerciseWhereInput =
                and.length > 0 ? { AND: and } : {};

            const findArgs: Parameters<typeof prisma.exercise.findMany>[0] = {
                where,
                orderBy: { id: 'asc' },
                take: limit,
            };

            if (cursor) {
                findArgs.cursor = { id: cursor };
                findArgs.skip = 1; // Skip the cursor item itself
            }

            items = await prisma.exercise.findMany(findArgs);
        }

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
