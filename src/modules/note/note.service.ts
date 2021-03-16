import { injectable, singleton } from 'tsyringe';
import { NoteCreateDto } from './dto';
import { INote, Note } from './note.model';
import { NoteMapper } from './note.mapper';

@injectable()
@singleton()
export class NoteService {
  public models = { Note: Note };

  constructor(public noteMapper: NoteMapper) {}

  /**
   * @description
   * creates a new note
   */
  public async createNote(dto: NoteCreateDto): Promise<INote> {
    const note = new this.models.Note();
    note.title = dto.title;
    note.content = dto.content;
    note.category = dto.category;
    await note.save();
    return Promise.resolve(note);
  }

  /**
   * @description
   * deletes the note by marking it as deleted
   */
  public async deleteNote(id: string): Promise<void> {
    const note = await this.models.Note.findOne({ id: id, isDeleted: false });
    if (note) {
      note.isDeleted = true;
      await note.save();
      return;
    } else {
      return Promise.reject(new Error('invalid note id'));
    }
  }

  /**
   * @description
   * finds and returns the note with given id
   */
  public async findNoteByid(id: string): Promise<INote> {
    const note = await this.models.Note.findOne({ id: id, isDeleted: false });
    if (note) {
      return Promise.resolve(note);
    } else {
      return Promise.reject(new Error('invalid note id'));
    }
  }
}
