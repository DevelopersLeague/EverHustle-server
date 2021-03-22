import mongoose, { Model } from 'mongoose';
import { INote } from '../note/note.model';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isDeleted: boolean;
  notes: INote[];
}

const userSchema = new mongoose.Schema({
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
});

export const User = mongoose.model<IUser>('User', userSchema);
