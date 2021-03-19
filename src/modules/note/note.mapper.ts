import { injectable, singleton } from 'tsyringe';
import { NoteCreateDto, NoteResponseDto, NoteUpdateDto } from './dto';
import { INote } from './note.model';

@injectable()
@singleton()
export class NoteMapper {
  public anyToCreateDto(body: any): NoteCreateDto {
    const createNotedto = new NoteCreateDto(
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
      note.category
    );
    return respDto;
  }
}
