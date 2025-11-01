const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const rows = [
        { name: 'Barbell Bench Press', category: 'WEIGHTS', primaryMuscle: 'CHEST', equipment: 'Barbell' },
        { name: 'Incline Dumbbell Press', category: 'WEIGHTS', primaryMuscle: 'CHEST', equipment: 'Dumbbell' },
        { name: 'Back Squat', category: 'WEIGHTS', primaryMuscle: 'QUADS', equipment: 'Barbell' },
        { name: 'Romanian Deadlift', category: 'WEIGHTS', primaryMuscle: 'HAMSTRINGS', equipment: 'Barbell' },
        { name: 'Pull-Up', category: 'WEIGHTS', primaryMuscle: 'BACK', equipment: 'Bodyweight' },
        { name: 'Overhead Press', category: 'WEIGHTS', primaryMuscle: 'SHOULDERS', equipment: 'Barbell' },
        { name: 'Plank', category: 'MOBILITY', primaryMuscle: 'CORE', equipment: 'Bodyweight' },
        { name: 'Treadmill Run', category: 'CARDIO', primaryMuscle: 'FULL_BODY', modality: 'Running' },
        { name: 'Stationary Bike', category: 'CARDIO', primaryMuscle: 'FULL_BODY', modality: 'Cycling' },
    ];

    for (const row of rows) {
        await prisma.exercise.upsert({
            where: {
                name_category_primaryMuscle: {
                    name: row.name,
                    category: row.category,
                    primaryMuscle: row.primaryMuscle,
                },
            },
            update: {},
            create: row,
        });
    }
    console.log('Exercise seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());