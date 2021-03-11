import { Request, Response, NextFunction } from 'express';
import { LogEntry } from 'winston';
import { createLogger, transports, format, Logger } from 'winston';
import { Format } from 'logform';

const NODE_ENV = process.env.NODE_ENV || 'development';

// error logger
export const errorLogger: Logger = createLogger({
  level: 'error',
  transports: [
    new transports.Console({
      format: format.combine(format.cli()),
      level: 'error',
    }),
  ],
});
// silent in testing
if (NODE_ENV === 'test' || NODE_ENV === 'testing') {
  errorLogger.transports.forEach((t) => {
    t.silent = true;
  });
}
// logfile format
const logFileFormat: Format = format.combine(
  format.metadata(),
  format.splat(),
  format.timestamp()
);

/**
 * @description
 * middleware to log error\
 * by default logs to the console
 * @param file - if given errors will be logged to the file
 */
export function logError(opts?: { file?: string }) {
  return function (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (opts && opts.file) {
      errorLogger.add(
        new transports.File({
          filename: opts.file,
          format: logFileFormat,
          level: 'error',
        })
      );
    }
    const entry: LogEntry = {
      level: 'error',
      message: err.stack || err.message,
      error: {
        message: err.message,
        stack: err.stack,
        name: err.name,
        // if err is normal error then statusCode will be null
        statusCode: err.statusCode,
      },
      request: req,
    };
    errorLogger.log(entry);
    next(err);
  };
}
