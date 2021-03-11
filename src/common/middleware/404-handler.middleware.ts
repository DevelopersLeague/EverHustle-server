import { Request, Response, Handler } from 'express';
/**
 * @description
 * middleware to handle 404 response\
 * use after controllers and before error handlers
 */
export function handle404(): Handler {
  return function (req: Request, res: Response): void {
    res.status(404).json({ statusCode: 404, message: 'resource not found' });
  };
}
