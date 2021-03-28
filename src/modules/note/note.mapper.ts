import { injectable, singleton } from 'tsyringe';
import { IUser } from '../user';
import { NoteCreateDto, NoteResponseDto, NoteUpdateDto } from './dto';
import { INote } from './note.model';

@injectable()
@singleton()
export class NotesMapper {
  public anyToCreateDto(body: any, user: IUser): NoteCreateDto {
    const createNotedto = new NoteCreateDto(
      user,
      body.title,
      body.content,
      body.category
    );
    return createNotedto;
  }

  public anyToUpdateDto(body: any): NoteUpdateDto {
    const updatedNotedto = new NoteUpdateDto(
      body.id,
      body.title,
      body.content,
      body.category
    );
    return updatedNotedto;
  }

  public modelToRespDto(note: INote): NoteResponseDto {
    const respDto = new NoteResponseDto(
      note.id,
      note.title,
      note.content,
      note.category,
      note.createdAt,
      note.updatedAt
    );
    return respDto;
  }
}
