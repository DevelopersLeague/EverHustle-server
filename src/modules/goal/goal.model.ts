import mongoose from 'mongoose';
import { IUser } from '../user';

export interface IGoal extends mongoose.Document {
  title: string;
  content: string;
  category: string;
  isCompleted: boolean;
  isDeleted: boolean;
  user: IUser;
}

const goalSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);
