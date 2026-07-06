import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    metric: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    score: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  {
    timestamps: true,
  },
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;