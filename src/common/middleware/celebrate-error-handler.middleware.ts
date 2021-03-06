import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { isCelebrateError, CelebrateError } from 'celebrate';

export function handleCelebrateError(): ErrorRequestHandler {
  return function (
    err: CelebrateError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!isCelebrateError(err)) {
      next(err);
      return;
    }
    const errors: any[] = [];
    err.details.forEach((mapEntry, key) => {
      mapEntry.details.forEach((errorItem) => {
        errors.push({
          source: key,
          key: errorItem.context?.key,
          message: errorItem.message.replace(/"/g, "'"),
        });
      });
    });
    const jsonResponse: any = {
      code: 400,
      errors: errors,
      message: errors[0].message,
    };
    res.status(400).json(jsonResponse);
  };
}
