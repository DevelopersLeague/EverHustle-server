import mongoose, { Model } from 'mongoose';
import { IUser } from '../user';

export interface IFocusTime extends mongoose.Document {
  hr: number;
  min: number;
  sec: number;
  date: Date;
  user: IUser;
  isDeleted: boolean;
}

const focusTimeSchema = new mongoose.Schema({
  hr: Number,
  min: Number,
  sec: Number,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isDeleted: { type: Boolean, default: false },
});

export const FocusTime = mongoose.model<IFocusTime>(
  'FocusTime',
  focusTimeSchema
);
