import mongoose from 'mongoose';
import { IUser } from '../user';

export interface IReminder extends mongoose.Document {
  title: string;
  content: string;
  category: string;
  isDeleted: boolean;
  isActive: boolean;
  user: IUser;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date,
  },
  { timestamps: true }
);

export const Reminder = mongoose.model<IReminder>('Reminder', reminderSchema);
