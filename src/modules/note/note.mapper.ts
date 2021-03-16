import { injectable, singleton } from 'tsyringe';
import { NoteCreateDto, NoteResponseDto } from './dto';
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

  public modelToRespDto(user: INote): NoteResponseDto {
    const respDto = new NoteResponseDto(
      user.id,
      user.title,
      user.content,
      user.category
    );
    return respDto;
  }
}
