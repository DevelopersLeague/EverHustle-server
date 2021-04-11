import express, { Application } from 'express';
import { handle404, handleError, logError } from './common/middleware';
import { container } from 'tsyringe';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { IBaseController, handleCelebrateError } from './common';
import { env } from './config/env.config';

export class App {
  public expressApp: Application;

  constructor(public controllerTokens: any[]) {
    this.expressApp = express();
    this.initMiddleware();
    this.initControllers();
    this.expressApp.use(handle404());
    this.initErrorHandler();
  }

  public initMiddleware(): void {
    this.expressApp.use(cors());
    this.expressApp.use(express.urlencoded({ extended: false }));
    this.expressApp.use(express.json());
    this.expressApp.use(helmet());
    this.expressApp.use(
      morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev')
    );
  }

  public initControllers(): void {
    this.controllerTokens.forEach((token) => {
      const controllerinstance: IBaseController = container.resolve(token);
      this.expressApp.use(
        controllerinstance.path,
        ...controllerinstance.middlewareBefore,
        controllerinstance.router,
        ...controllerinstance.middlewareAfter
      );
    });
  }

  public initErrorHandler(): void {
    this.expressApp.use(handleCelebrateError());
    this.expressApp.use(logError());
    this.expressApp.use(handleError());
  }
}
