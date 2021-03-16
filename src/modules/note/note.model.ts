import mongoose from 'mongoose';

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  category: string;
  isDeleted: boolean;
}

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Note = mongoose.model<INote>('note', noteSchema);
