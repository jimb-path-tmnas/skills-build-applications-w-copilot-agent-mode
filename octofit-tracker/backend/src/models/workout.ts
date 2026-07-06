import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: [{ type: String, required: true, trim: true }],
    description: { type: String, required: true, trim: true },
    coachTip: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const Workout = model('Workout', workoutSchema);

export default Workout;