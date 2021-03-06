import { Router, Request, Response, Handler } from 'express';
import { inject, injectable, singleton } from 'tsyringe';
import { catchAsync, IBaseController, logger } from '../../common';
import { NotesService } from './note.service';
import { NotesMapper } from './note.mapper';
import { AuthMiddleware } from '../auth';
import createHttpError, { Unauthorized } from 'http-errors';
import { tokens } from '../../config/tokens.config';
import * as dto from './dto';
import { celebrate } from 'celebrate';

@injectable()
@singleton()
export class NotesController implements IBaseController {
  public path = '/api/v1/notes';
  public router = Router();
  public middlewareBefore: Handler[] = [];
  public middlewareAfter: Handler[] = [];

  constructor(
    @inject(tokens.NOTE_SERVICE) private readonly notesService: NotesService,
    private readonly notesMapper: NotesMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      '/',
      celebrate({ body: dto.NoteCreateDto.validationSchema }),
      this.authMiddleware.ensureAuth,
      catchAsync(this.createOneNote.bind(this))
    );
    this.router.get(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getOneNote.bind(this))
    );
    this.router.get(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getAllNotes.bind(this))
    );
    this.router.delete(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.deleteOneNote.bind(this))
    );
    this.router.put(
      '/:id',
      celebrate({ body: dto.NoteUpdateDto.validationSchema }),
      this.authMiddleware.ensureAuth,
      catchAsync(this.updateOneNote.bind(this))
    );
  }
  /**
   * @url
   * POST /api/v1/notes
   *
   * @description
   * creates a new todo
   */
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

  /**
   * @url
   * GET /api/v1/notes
   *
   * @description
   * gets all the todos
   */
  public async getAllNotes(req: Request, res: Response): Promise<any> {
    const category = req.query.category;
    let notes = await this.notesService.getAllNotesOfUser(req.user?.id);
    if (category) {
      notes = notes.filter((note) => note.category == category);
    }
    const notesResp = notes.map((note) =>
      this.notesMapper.modelToRespDto(note)
    );
    res.json({ notes: notesResp });
  }

  /**
   * @url
   * GET /api/v1/notes/{:id}
   *
   * @description
   * gets note by id
   */
  public async getOneNote(req: Request, res: Response): Promise<any> {
    const id = req.params['id'];
    const note = await this.notesService.findNoteByid(id);
    await note.populate('user').execPopulate();
    if (req.user?.id !== note.user.id) {
      throw new createHttpError.Unauthorized('unauthorized to access note');
    }
    res.json({ note: this.notesMapper.modelToRespDto(note) });
  }

  /**
   * @url
   * DELETE /api/v1/notes/{:id}
   *
   * @description
   * deletes a note
   */
  public async deleteOneNote(req: Request, res: Response): Promise<any> {
    const id = req.params['id'];
    const note = await this.notesService.findNoteByid(id);
    await note.populate('user').execPopulate();
    if (req.user?.id !== note.user.id) {
      throw new createHttpError.Unauthorized('unauthorized to access note');
    }
    await this.notesService.deleteNote(note.id);
    res.json({
      message: 'note deleted',
      note: this.notesMapper.modelToRespDto(note),
    });
  }

  /**
   * @url
   * PUT /api/v1/notes/{:id}
   *
   * @description
   * update one note
   */
  public async updateOneNote(req: Request, res: Response): Promise<any> {
    const note1 = await this.notesService.findNoteByid(req.params.id);
    // confirm user
    await note1.populate('user').execPopulate();
    if (req.user?.id != note1.user.id) {
      throw new createHttpError.Unauthorized('unauthorized to update todo');
    }
    const note = await this.notesService.updateNote(
      this.notesMapper.anyToUpdateDto({ id: req.params['id'], ...req.body })
    );
    res.json({
      message: 'note updated',
      note: this.notesMapper.modelToRespDto(note),
    });
  }
}
