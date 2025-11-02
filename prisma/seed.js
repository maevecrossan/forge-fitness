const { PrismaClient, ExerciseCategory, MuscleGroup } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper: quick alias
const C = ExerciseCategory;
const M = MuscleGroup;

// Exercise seeding script
async function main() {
    const EXERCISES = [
        // CHEST
        { name: 'Barbell Bench Press', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Barbell', description: 'Lie on bench, grip slightly wider than shoulders, lower bar to chest, press back up while keeping elbows ~45°.' },
        { name: 'Incline Dumbbell Press', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Dumbbell', description: 'On inclined bench, press dumbbells upward with palms forward, lower slowly with elbows under wrists.' },
        { name: 'Decline Bench Press', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Barbell', description: 'Lie on decline bench, grip slightly wider than shoulders, lower bar to chest, press back up while keeping elbows ~45°.' },
        { name: 'Chest Fly (Machine)', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Machine', description: 'Sit on machine with arms outstretched, bring handles together in front of chest, slowly return to start.' },
        { name: 'Dumbbell Chest Fly', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Dumbbell', description: 'Lie on bench with dumbbells above chest, lower weights out to sides, bring back together above chest.' },
        { name: 'Push-Up', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Bodyweight', description: 'Start in plank position, lower body to ground, push back up while keeping elbows at ~45°.' },
        { name: 'Cable Chest Fly', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Cable', description: 'Stand in center of cable machine, grab handles with arms outstretched, bring handles together in front of chest.' },
        { name: 'Chest Dip', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Bodyweight', description: 'Use parallel bars, lower body by bending elbows, push back up.' },
        { name: 'Smith Machine Bench Press', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Smith Machine', description: 'Lie on bench, grip bar slightly wider than shoulders, lower bar to chest, press back up.' },
        { name: 'Incline Cable Fly', category: C.WEIGHTS, primaryMuscle: M.CHEST, equipment: 'Cable', description: 'Set cables to low position, lie on incline bench, fly arms out to sides.' },

        // BACK
        { name: 'Pull-Up', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Bodyweight', description: 'Hang from bar with palms facing away, pull body up until chin is above bar.' },
        { name: 'Lat Pulldown', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Machine', description: 'Sit at machine, grab bar with wide grip, pull down to chest while leaning back slightly.' },
        { name: 'Barbell Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Barbell', description: 'Bend at hips, pull barbell to lower ribcage, keep elbows close to body.' },
        { name: 'Seated Cable Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Cable', description: 'Sit at cable machine, pull handle towards torso while leaning back slightly.' },
        { name: 'Single-Arm Dumbbell Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Dumbbell', description: 'Place one knee on bench, pull dumbbell towards hip with opposite hand.' },
        { name: 'Machine Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Machine', description: 'Sit at machine, pull handles towards torso while keeping elbows close.' },
        { name: 'Chest-Supported Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Machine', description: 'Lie face down on bench, pull handles towards torso while keeping elbows close.' },
        { name: 'T-Bar Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Barbell', description: 'Stand over barbell, pull towards chest while keeping back straight.' },
        { name: 'Inverted Row', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Bodyweight', description: 'Lie on back under bar, pull chest to bar while keeping body straight.' },
        { name: 'Straight Arm Pulldown', category: C.WEIGHTS, primaryMuscle: M.BACK, equipment: 'Cable', description: 'Stand in front of cable machine, pull bar down to thighs with straight arms.' },

        // SHOULDERS
        { name: 'Overhead Press', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Barbell', description: 'Stand with feet shoulder-width apart, press barbell overhead while keeping core engaged.' },
        { name: 'Dumbbell Shoulder Press', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Dumbbell', description: 'Sit or stand with dumbbells at shoulder height, press upward until arms are fully extended.' },
        { name: 'Lateral Raise', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Dumbbell', description: 'Stand with feet hip-width apart, raise dumbbells out to sides until shoulder level.' },
        { name: 'Face Pull', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Cable', description: 'Stand facing cable machine, pull rope towards face while keeping elbows high.' },
        { name: 'Arnold Press', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Dumbbell', description: 'Sit or stand with dumbbells at chest level, rotate palms outward as you press up.' },
        { name: 'Front Raise', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Dumbbell', description: 'Stand with feet hip-width apart, raise dumbbells in front of you to shoulder height.' },
        { name: 'Rear Delt Fly', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Dumbbell', description: 'Bend at hips, raise dumbbells out to sides while keeping elbows slightly bent.' },
        { name: 'Machine Shoulder Press', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Machine', description: 'Sit at machine, press handles upward until arms are fully extended.' },
        { name: 'Cable Lateral Raise', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Cable', description: 'Stand with feet hip-width apart, raise cable handle out to side until shoulder level.' },
        { name: 'Upright Row', category: C.WEIGHTS, primaryMuscle: M.SHOULDERS, equipment: 'Barbell', description: 'Stand with feet shoulder-width apart, pull barbell up to chin while keeping elbows high.' },

        // ARMS
        { name: 'Barbell Biceps Curl', category: C.WEIGHTS, primaryMuscle: M.BICEPS, equipment: 'Barbell', description: 'Stand with feet shoulder-width apart, curl barbell towards chest while keeping elbows close to body.' },
        { name: 'Dumbbell Hammer Curl', category: C.WEIGHTS, primaryMuscle: M.BICEPS, equipment: 'Dumbbell', description: 'Stand with feet shoulder-width apart, hold dumbbells with palms facing each other, curl towards shoulders.' },
        { name: 'Cable Triceps Pushdown', category: C.WEIGHTS, primaryMuscle: M.TRICEPS, equipment: 'Cable', description: 'Stand facing cable machine, push down on handle until arms are fully extended.' },
        { name: 'EZ-Bar Skullcrusher', category: C.WEIGHTS, primaryMuscle: M.TRICEPS, equipment: 'EZ Bar', description: 'Lie on bench, hold EZ bar above forehead, lower bar by bending elbows.' },
        { name: 'Preacher Curl', category: C.WEIGHTS, primaryMuscle: M.BICEPS, equipment: 'Machine', description: 'Sit at preacher curl machine, curl weight towards shoulders while keeping upper arms stationary.' },
        { name: 'Overhead Triceps Extension', category: C.WEIGHTS, primaryMuscle: M.TRICEPS, equipment: 'Dumbbell', description: 'Stand or sit, hold dumbbell overhead with both hands, lower behind head by bending elbows.' },
        { name: 'Concentration Curl', category: C.WEIGHTS, primaryMuscle: M.BICEPS, equipment: 'Dumbbell', description: 'Sit on bench, rest elbow on inner thigh, curl dumbbell towards shoulder.' },
        { name: 'Close-Grip Bench Press', category: C.WEIGHTS, primaryMuscle: M.TRICEPS, equipment: 'Barbell', description: 'Lie on bench, hold barbell with narrow grip, lower to chest and press back up.' },
        { name: 'Cable Curl', category: C.WEIGHTS, primaryMuscle: M.BICEPS, equipment: 'Cable', description: 'Stand facing cable machine, curl handle towards shoulders while keeping elbows stationary.' },
        { name: 'Tricep Dip', category: C.WEIGHTS, primaryMuscle: M.TRICEPS, equipment: 'Bodyweight', description: 'Use parallel bars or a bench, lower body by bending elbows, then press back up.' },

        // LEGS
        { name: 'Back Squat', category: C.WEIGHTS, primaryMuscle: M.QUADS, equipment: 'Barbell', description: 'Stand with feet shoulder-width apart, barbell resting on upper back, squat down until thighs are parallel to ground.' },
        { name: 'Front Squat', category: C.WEIGHTS, primaryMuscle: M.QUADS, equipment: 'Barbell', description: 'Stand with feet shoulder-width apart, barbell resting on front shoulders, squat down until thighs are parallel to ground.' },
        { name: 'Leg Press', category: C.WEIGHTS, primaryMuscle: M.QUADS, equipment: 'Machine', description: 'Sit on leg press machine, push platform away by extending legs.' },
        { name: 'Romanian Deadlift', category: C.WEIGHTS, primaryMuscle: M.HAMSTRINGS, equipment: 'Barbell', description: 'Stand with feet hip-width apart, hold barbell in front, lower by bending at hips while keeping back straight.' },
        { name: 'Deadlift', category: C.WEIGHTS, primaryMuscle: M.HAMSTRINGS, equipment: 'Barbell', description: 'Stand with feet hip-width apart, barbell over mid-foot, lift by extending hips and knees.' },
        { name: 'Hip Thrust', category: C.WEIGHTS, primaryMuscle: M.GLUTES, equipment: 'Barbell', description: 'Sit on ground with upper back against bench, barbell over hips, thrust hips upward.' },
        { name: 'Walking Lunge', category: C.WEIGHTS, primaryMuscle: M.GLUTES, equipment: 'Dumbbell', description: 'Stand with feet together, step forward into lunge while holding dumbbells at sides.' },
        { name: 'Leg Extension', category: C.WEIGHTS, primaryMuscle: M.QUADS, equipment: 'Machine', description: 'Sit on leg extension machine, extend legs to lift weight.' },
        { name: 'Leg Curl', category: C.WEIGHTS, primaryMuscle: M.HAMSTRINGS, equipment: 'Machine', description: 'Lie face down on leg curl machine, curl legs up towards butt.' },
        { name: 'Standing Calf Raise', category: C.WEIGHTS, primaryMuscle: M.CALVES, equipment: 'Machine', description: 'Stand on calf raise machine, raise heels by extending ankles.' },
        { name: 'Seated Calf Raise', category: C.WEIGHTS, primaryMuscle: M.CALVES, equipment: 'Machine', description: 'Sit on calf raise machine, raise heels by extending ankles.' },

        // CORE
        { name: 'Plank Hold', category: C.MOBILITY, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Hold a forearm plank position with body in a straight line from head to heels.' },
        { name: 'Hanging Leg Raise', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Hang from a pull-up bar and raise legs to hip level.' },
        { name: 'Cable Woodchop', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Cable', description: 'Stand next to a cable machine, grasp handle with both hands, and twist torso to pull cable across body.' },
        { name: 'Russian Twist', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Dumbbell', description: 'Sit on the ground with knees bent, lean back slightly, hold a dumbbell with both hands, and twist torso to touch the ground beside you.' },
        { name: 'Crunch', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Lie on your back with knees bent, lift shoulders off the ground by contracting abs.' },
        { name: 'Reverse Crunch', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Lie on your back with legs raised, curl hips off the ground by contracting abs.' },
        { name: 'Bicycle Crunch', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Lie on your back, bring knees to chest, and alternate touching elbows to opposite knees.' },
        { name: 'Ab Wheel Rollout', category: C.WEIGHTS, primaryMuscle: M.CORE, equipment: 'Ab Wheel', description: 'Kneel on the ground, hold ab wheel, and roll forward while keeping core engaged.' },
        { name: 'Side Plank', category: C.MOBILITY, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Lie on your side, prop up on elbow, and lift hips to create a straight line from head to heels.' },
        { name: 'Mountain Climber', category: C.CARDIO, primaryMuscle: M.CORE, equipment: 'Bodyweight', description: 'Start in a plank position, drive knees towards chest alternately at a quick pace.' },

        // CARDIO (use modality)
        { name: 'Treadmill Run', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Run on a treadmill at a steady pace.' },
        { name: 'Outdoor Run', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Run outdoors on a track or trail.' },
        { name: 'Stationary Bike', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Pedal on a stationary bike at a moderate intensity.' },
        { name: 'Rowing Machine', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Use a rowing machine to simulate rowing a boat.' },
        { name: 'Elliptical', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Use an elliptical machine for a low-impact cardio workout.' },
        { name: 'Stair Climber', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Climb stairs on a stair climber machine.' },
        { name: 'Jump Rope', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Jump rope at a steady pace for cardio.' },
        { name: 'Swimming', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Swim laps in a pool for cardio.' },
        { name: 'Battle Ropes', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Use battle ropes for a full-body workout.' },
        { name: 'Sled Push', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Push a weighted sled for a full-body workout.' },
        { name: 'Sled Pull', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Pull a weighted sled for a full-body workout.' },
        { name: 'Assault Bike', category: C.CARDIO, primaryMuscle: M.FULL_BODY, description: 'Use an assault bike for a high-intensity cardio workout.' },

        // MOBILITY / COOL DOWN
        { name: 'Hip Flexor Stretch', category: C.MOBILITY, primaryMuscle: M.LOWER_BODY, description: 'Lunge stretch targeting hip flexors.' },
        { name: 'Thoracic Extension on Foam Roller', category: C.MOBILITY, primaryMuscle: M.BACK, description: 'Foam rolling exercise to improve thoracic spine mobility.' },
        { name: '90/90 Hip Switch', category: C.MOBILITY, primaryMuscle: M.LOWER_BODY, description: 'Hip mobility exercise transitioning between 90/90 positions.' },
        { name: 'Child’s Pose', category: C.COOL_DOWN, primaryMuscle: M.FULL_BODY, description: 'Kneel on the ground, sit back on heels, and stretch arms forward.' },
        { name: 'Cat-Cow', category: C.COOL_DOWN, primaryMuscle: M.FULL_BODY, description: 'Alternate between arching and rounding the back while on all fours.' },
    ];

    for (const exercise of EXERCISES) {
        await prisma.exercise.upsert({
            where: {
                name_category_primaryMuscle: {
                    name: exercise.name,
                    category: exercise.category,
                    primaryMuscle: exercise.primaryMuscle,
                },
            },
            update: {},
            create: exercise,
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