import { Router, Request, Response } from 'express';
import { injectable, singleton } from 'tsyringe';
import { IBaseController } from '../../common';
import { AuthMiddleware } from '../auth';
import { GoalMapper } from './goal.mapper';
import { GoalService } from './goal.service';
import { catchAsync } from '../../common';
import createHttpError from 'http-errors';

@injectable()
@singleton()
export class GoalController implements IBaseController {
  public path = '/api/v1/goals';
  public router = Router();
  public middlewareBefore = [];
  public middlewareAfter = [];
  constructor(
    private readonly goalService: GoalService,
    private readonly goalMapper: GoalMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }
  public initRoutes(): void {
    this.router.get(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getAllGoals.bind(this))
    );
    this.router.get(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getOneGoal.bind(this))
    );
    this.router.post(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.createOneGoal.bind(this))
    );
    this.router.put(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.updateOneGoal.bind(this))
    );
    this.router.delete(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.deleteOneGoal.bind(this))
    );
  }

  /**
   * @url
   * POST /api/v1/goals
   * @discription
   * create one note
   */
  public async createOneGoal(req: Request, res: Response): Promise<any> {
    const goal = await this.goalService.createGoal(
      this.goalMapper.anyToCreateDto(req.body, req.user!)
    );
    res.status(201).json({ goal: this.goalMapper.modelToRespDto(goal) });
  }

  /**
   * @url
   * GET /api/v1/goals
   * @discription
   * get all goal
   */
  public async getAllGoals(req: Request, res: Response): Promise<any> {
    await req.user?.populate('goals').execPopulate();
    const category = req.query.category;
    let goals = req.user?.goals.filter((goal) => {
      return goal.isDeleted === false;
    });
    if (category) {
      goals = goals?.filter((goal) => {
        return goal.category == category;
      });
    }
    const goalsResp = goals?.map((goal) => {
      return this.goalMapper.modelToRespDto(goal);
    });
    res.json({ goals: goalsResp });
  }

  /**
   * @url
   * GET /api/v1/goals/{id}
   * @discription
   * get one goal
   */
  public async getOneGoal(req: Request, res: Response): Promise<any> {
    const goal = await this.goalService.findGoalById(req.params.id);
    await goal.populate('user').execPopulate();
    if (goal.user.id !== req.user?.id) {
      throw new createHttpError.Forbidden('unauthorized to access goal');
    }
    res.json({ goal: this.goalMapper.modelToRespDto(goal) });
  }

  /**
   * @url
   * PUT /api/v1/goals/{id}
   * @discription
   * update one goal
   */
  public async updateOneGoal(req: Request, res: Response): Promise<any> {
    let goal = await this.goalService.findGoalById(req.params.id);
    await goal.populate('user').execPopulate();
    if (goal.user.id !== req.user?.id) {
      throw new createHttpError.Forbidden('unauthorized to access goal');
    }
    goal = await this.goalService.updateGoal(
      this.goalMapper.anyToUpdateDto({ id: req.params.id, ...req.body })
    );
    res.json({ goal: this.goalMapper.modelToRespDto(goal) });
  }

  /**
   * @url
   * DELETE /api/v1/goals/{id}
   * @discription
   * delete one goal
   */
  public async deleteOneGoal(req: Request, res: Response): Promise<any> {
    const goal = await this.goalService.findGoalById(req.params.id);
    await goal.populate('user').execPopulate();
    if (goal.user.id !== req.user?.id) {
      throw new createHttpError.Forbidden('unauthorized to access goal');
    }
    await this.goalService.deleteGoal(goal.id);
    res.json({ goal: this.goalMapper.modelToRespDto(goal) });
  }
}
