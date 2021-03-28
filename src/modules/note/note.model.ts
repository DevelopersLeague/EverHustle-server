import mongoose, { Model } from 'mongoose';
import { IUser } from '../user';

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  category: string;
  isDeleted: boolean;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Note = mongoose.model<INote>('Note', noteSchema);
