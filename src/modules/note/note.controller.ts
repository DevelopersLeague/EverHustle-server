import { Router, Request, Response, Handler } from 'express';
import { injectable, singleton } from 'tsyringe';
import { catchAsync, IBaseController, logger } from '../../common';
import { NotesService } from './note.service';
import { NotesMapper } from './note.mapper';
import { AuthMiddleware } from '../auth';

@injectable()
@singleton()
export class NotesController implements IBaseController {
  public path = '/api/v1/notes';
  public router = Router();
  public middlewareBefore: Handler[] = [];
  public middlewareAfter: Handler[] = [];

  constructor(
    private readonly notesService: NotesService,
    private readonly notesMapper: NotesMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.createOneNote.bind(this))
    );
    // this.router.get(
    //   '/:id',
    //   this.authMiddleware.ensureAuth,
    //   catchAsync(this.getOneNote.bind(this))
    // );
    this.router.get(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getAllNotes.bind(this))
    );
    // this.router.delete(
    //   '/:id',
    //   this.authMiddleware.ensureAuth,
    //   catchAsync(this.deleteOneNote.bind(this))
    // );
    // this.router.put(
    //   '/:id',
    //   this.authMiddleware.ensureAuth,
    //   catchAsync(this.updateOneNote.bind(this))
    // );
  }
  public async createOneNote(req: Request, res: Response): Promise<any> {
    if (req.user) {
      const todo = await this.notesService.createNote(
        this.notesMapper.anyToCreateDto(req.body, req.user)
      );
      return res
        .status(201)
        .json({ note: this.notesMapper.modelToRespDto(todo) });
    }
  }

  public async getAllNotes(req: Request, res: Response): Promise<any> {
    const notes = await this.notesService.getAllNotesOfUser(req.user?.id);
    const notesResp = notes.map((note) =>
      this.notesMapper.modelToRespDto(note)
    );
    res.json({ notes: notesResp });
  }
}
