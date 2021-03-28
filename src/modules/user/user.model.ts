import mongoose, { Model } from 'mongoose';
import { IFocusTime } from '../focustime/focustime.model';
import { IGoal } from '../goal/goal.model';
import { INote } from '../note/note.model';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
  notes: INote[];
  focusTimes: IFocusTime[];
  goals: IGoal[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: { type: String, require: true },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    focusTimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FocusTime' }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
