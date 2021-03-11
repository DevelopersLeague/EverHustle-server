import { Format } from 'logform';
import { createLogger, transports, format } from 'winston';

const NODE_ENV = process.env.NODE_ENV || 'development';

// logfile format
const logFileFormat: Format = format.combine(
  format.metadata(),
  format.splat(),
  format.timestamp()
);

export const logger = createLogger({
  // when not in production log debug and up
  level: NODE_ENV === 'production' ? 'info' : 'debug',
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
if (NODE_ENV == 'test' || NODE_ENV == 'testing') {
  logger.transports.forEach((transport) => {
    transport.silent = true;
  });
}
