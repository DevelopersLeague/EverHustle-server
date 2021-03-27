import { UserService } from '../user';
import { Model } from 'mongoose';
import { IGoal } from './goal.model';
import { GoalCreateDto } from './dto/goal-create.dto';
import createHttpError from 'http-errors';
import { GoalUpdateDto } from './dto/goal-update.dto';
import { inject, injectable, singleton } from 'tsyringe';
import { tokens } from '../../config/tokens.config';

@injectable()
@singleton()
export class GoalService {
  constructor(
    private readonly userService: UserService,
    @inject(tokens.GOAL_MODEL)
    private readonly Goal: Model<IGoal>
  ) {}

  /**
   * @desscription
   * creates a new goal
   */
  public async createGoal(dto: GoalCreateDto): Promise<IGoal> {
    const goal = new this.Goal();
    goal.title = dto.title;
    goal.content = dto.content;
    goal.category = dto.category;
    const user = await this.userService.findUserByid(dto.user.id);
    goal.user = user;
    await user.populate('goals').execPopulate();
    user.goals.push(goal);
    await goal.save();
    await user.save();
    return goal;
  }

  /**
   * @description
   * returns goal by id
   */
  public async findGoalById(id: string): Promise<IGoal> {
    const goal = await this.Goal.findById(id).where({ isDeleted: false });
    if (!goal) {
      throw new createHttpError.BadRequest('invalid goal id');
    }
    return goal;
  }

  /**
   * @description
   * deletes a given goal by id
   */
  public async deleteGoal(id: string): Promise<void> {
    const goal = await this.findGoalById(id);
    if (!goal) {
      throw new createHttpError.BadGateway('invalid goal id');
    }
    goal.isDeleted = true;
    await goal.save();
    return;
  }

  /**
   * @discription
   * updates a given goal
   */
  public async updateGoal(dto: GoalUpdateDto): Promise<IGoal> {
    const goal = await this.findGoalById(dto.id);
    if (dto.title) {
      goal.title = dto.title;
    }
    if (dto.content) {
      goal.content = dto.content;
    }
    if (dto.category) {
      goal.category = dto.category;
    }
    if (dto.isCompleted) {
      goal.isCompleted = dto.isCompleted;
    }
    await goal.save();
    return goal;
  }
}
