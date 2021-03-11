import { Request, Response, NextFunction } from 'express';

// wrap all async request handlers in your routes files with this function
// to catch async errors and send them to error handling middleware
export const catchAsync = (
  fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>
) => {
  // takes an async function and returns a handler that runs that function and catches errors
  return function (req: Request, res: Response, next: NextFunction): any {
    fn(req, res, next).catch(next);
  };
};
