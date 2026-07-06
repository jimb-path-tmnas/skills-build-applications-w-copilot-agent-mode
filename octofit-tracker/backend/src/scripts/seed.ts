import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        city: 'Seattle',
        motto: 'Own every ascent.',
        focus: 'Endurance training',
      },
      {
        name: 'Metro Lifters',
        city: 'Chicago',
        motto: 'Strong reps, sharp form.',
        focus: 'Strength and mobility',
      },
      {
        name: 'Sunset Sprinters',
        city: 'San Diego',
        motto: 'Finish fast together.',
        focus: 'Speed and conditioning',
      },
    ]);

    const [summitStriders, metroLifters, sunsetSprinters] = teams;

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava.patel@octofit.dev',
        age: 29,
        fitnessLevel: 'Advanced',
        goals: ['Half marathon PR', 'Lower resting heart rate'],
        team: summitStriders._id,
      },
      {
        name: 'Marcus Reed',
        email: 'marcus.reed@octofit.dev',
        age: 34,
        fitnessLevel: 'Intermediate',
        goals: ['Build lean muscle', 'Improve squat depth'],
        team: metroLifters._id,
      },
      {
        name: 'Elena Gomez',
        email: 'elena.gomez@octofit.dev',
        age: 26,
        fitnessLevel: 'Intermediate',
        goals: ['Increase sprint speed', 'Boost VO2 max'],
        team: sunsetSprinters._id,
      },
      {
        name: 'Jordan Kim',
        email: 'jordan.kim@octofit.dev',
        age: 31,
        fitnessLevel: 'Beginner',
        goals: ['Stay consistent', 'Train 4 days a week'],
        team: summitStriders._id,
      },
    ]);

    const [avaPatel, marcusReed, elenaGomez, jordanKim] = users;

    await Workout.insertMany([
      {
        title: 'Tempo Trail Builder',
        category: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 45,
        targetMuscles: ['Glutes', 'Calves', 'Core'],
        description: 'A rolling tempo run with hiking incline intervals.',
        coachTip: 'Hold back in the first block so the last climb stays strong.',
      },
      {
        title: 'Barbell Basics Reloaded',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 60,
        targetMuscles: ['Quads', 'Hamstrings', 'Back'],
        description: 'Compound lifts focused on squat, row, and hinge patterns.',
        coachTip: 'Treat each warm-up set like a practice set for your bracing.',
      },
      {
        title: 'Track Burst Ladder',
        category: 'HIIT',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        targetMuscles: ['Hamstrings', 'Hip Flexors', 'Core'],
        description: 'Fast ladder intervals alternating hard pushes and short floats.',
        coachTip: 'Stay tall through acceleration to keep your turnover quick.',
      },
    ]);

    await Activity.insertMany([
      {
        user: avaPatel._id,
        team: summitStriders._id,
        type: 'Trail Run',
        durationMinutes: 52,
        caloriesBurned: 610,
        distanceKm: 9.4,
        performedAt: new Date('2026-07-02T06:30:00.000Z'),
      },
      {
        user: marcusReed._id,
        team: metroLifters._id,
        type: 'Strength Session',
        durationMinutes: 68,
        caloriesBurned: 540,
        distanceKm: 0,
        performedAt: new Date('2026-07-03T17:45:00.000Z'),
      },
      {
        user: elenaGomez._id,
        team: sunsetSprinters._id,
        type: 'Track Intervals',
        durationMinutes: 38,
        caloriesBurned: 470,
        distanceKm: 6.2,
        performedAt: new Date('2026-07-04T18:15:00.000Z'),
      },
      {
        user: jordanKim._id,
        team: summitStriders._id,
        type: 'Recovery Walk',
        durationMinutes: 41,
        caloriesBurned: 220,
        distanceKm: 3.8,
        performedAt: new Date('2026-07-05T07:10:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: 'Weekly',
        metric: 'Consistency Score',
        rank: 1,
        score: 97,
        user: avaPatel._id,
        team: summitStriders._id,
      },
      {
        period: 'Weekly',
        metric: 'Consistency Score',
        rank: 2,
        score: 92,
        user: elenaGomez._id,
        team: sunsetSprinters._id,
      },
      {
        period: 'Weekly',
        metric: 'Consistency Score',
        rank: 3,
        score: 89,
        user: marcusReed._id,
        team: metroLifters._id,
      },
      {
        period: 'Weekly',
        metric: 'Consistency Score',
        rank: 4,
        score: 80,
        user: jordanKim._id,
        team: summitStriders._id,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
