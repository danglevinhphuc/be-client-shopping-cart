const { createLogger, format, transports } = require('winston');
const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
        handleExceptions: true,
      }),
      new transports.File({ filename: 'logfile.log', level: 'info' }),
      new transports.Console({
        handleExceptions: true,
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.simple(),
        ),
      })
    ],
    exitOnError: false,
  });
  
  module.exports = logger;