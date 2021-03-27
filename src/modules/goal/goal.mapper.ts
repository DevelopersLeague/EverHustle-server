import { IUser } from '../user';
import { GoalRespDto } from './dto/goal-resp.dto';
import { GoalCreateDto } from './dto/goal-create.dto';
import { IGoal } from './goal.model';
import { GoalUpdateDto } from './dto/goal-update.dto';
import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class GoalMapper {
  public anyToCreateDto(body: any, user: IUser): GoalCreateDto {
    const dto = new GoalCreateDto(
      body.title,
      body.content,
      body.category,
      user
    );
    return dto;
  }

  public modelToRespDto(goal: IGoal): GoalRespDto {
    const dto = new GoalRespDto(
      goal.id,
      goal.title,
      goal.content,
      goal.category,
      goal.isCompleted
    );
    return dto;
  }

  public anyToUpdateDto(body: any): GoalUpdateDto {
    const dto = new GoalUpdateDto(
      body.id,
      body.title,
      body.content,
      body.category,
      body.isCompleted
    );
    return dto;
  }
}
