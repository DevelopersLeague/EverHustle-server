import mongoose from 'mongoose';
import { IUser } from '../user';

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  category: string;
  isDeleted: boolean;
  user: IUser;
}

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Note = mongoose.model<INote>('Note', noteSchema);
