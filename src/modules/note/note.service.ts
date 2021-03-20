import { injectable, singleton } from 'tsyringe';
import { NoteCreateDto } from './dto';
import { INote, Note } from './note.model';
import { NoteUpdateDto } from './dto/note-update.dto';
import createHttpError from 'http-errors';
import { User } from '../user';
import { logger } from '../../common';

@injectable()
@singleton()
export class NotesService {
  public models = { Note: Note, User: User };

  /**
   * @description
   * creates a new note
   */
  public async createNote(dto: NoteCreateDto): Promise<INote> {
    const note = new this.models.Note();
    // logger.debug('user: %o', dto.user);
    const user = await this.models.User.findById(dto.user.id).where({
      isDeleted: false,
    });
    note.title = dto.title;
    note.content = dto.content;
    note.category = dto.category;
    if (user) {
      // logger.debug('user found: %o', user);
      note.user = user;
    } else {
      throw new Error('user not found');
    }
    await note.save();
    // logger.debug('%o', note);
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
      return Promise.reject(new createHttpError.BadRequest('invalid note id'));
    }
  }

  /**
   * @description
   * updates the data of a note
   */
  public async updateNote(dto: NoteUpdateDto): Promise<INote> {
    const note = await this.models.Note.findOne({
      id: dto.id,
      isDeleted: false,
    });
    if (note) {
      if (dto.title) {
        note.title = dto.title;
      }
      if (dto.category) {
        note.category = dto.category;
      }
      if (dto.content) {
        note.content = dto.content;
      }
      await note.save();
      return Promise.resolve(note);
    } else {
      return Promise.reject(new createHttpError.BadRequest('invalid note id'));
    }
  }

  /**
   * @description
   * finds and returns the note with given id
   */
  public async findNoteByid(id: string): Promise<INote> {
    const note = await this.models.Note.findById(id).where({
      isDeleted: false,
    });
    if (note) {
      return Promise.resolve(note);
    } else {
      return Promise.reject(new createHttpError.BadRequest('invalid note id'));
    }
  }
}
