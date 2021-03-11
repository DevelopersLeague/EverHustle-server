import { Format } from 'logform';
import { createLogger, transports, format } from 'winston';
import { env } from '../../config/env.config';

// logfile format
const logFileFormat: Format = format.combine(
  format.metadata(),
  format.splat(),
  format.timestamp()
);

export const logger = createLogger({
  // when not in production log debug and up
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  // add default transports ie console
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.cli()),
      level: 'debug',
    }),
    // new transports.File({
    //   level: 'info',
    //   filename: 'logs/general.json.log',
    //   format: logFileFormat,
    // }),
  ],
});

// silent in testing
if (env.NODE_ENV == 'test' || env.NODE_ENV == 'testing') {
  logger.transports.forEach((transport) => {
    transport.silent = true;
  });
}
