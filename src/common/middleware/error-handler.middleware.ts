import { Request, Response, NextFunction } from 'express';

const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * @description
 * sends the appropriate json response based on the error data\
 * works out of the box with all the errors from http-errors package
 * @param
 * stack - false by default, adds stack to error response if in development
 */
export function handleError(opts?: { stack: boolean }) {
  return function (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // default parameter values
    if (!opts) {
      opts = { stack: false };
    }
    // if not an instance of http-error then put default values
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'something went wrong';
    }
    const jsonResponse: {
      code: number;
      message: string;
      stack?: string;
    } = {
      code: err.statusCode,
      message: err.message,
    };
    // if stack is true then add stack to the log

    if (opts && opts.stack === true) {
      if (NODE_ENV === 'development') {
        jsonResponse.stack = err.stack;
      }
    }
    res.status(err.statusCode).json(jsonResponse);
  };
}
