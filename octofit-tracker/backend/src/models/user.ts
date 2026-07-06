import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: { type: String, required: true, trim: true },
    goals: [{ type: String, required: true, trim: true }],
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  {
    timestamps: true,
  },
);

const User = model('User', userSchema);

export default User;