

import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

winston.addColors({
  error: 'bold red',
  warn: 'italic yellow',
  info: 'green',
  debug: 'blue'
});



const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', 
  format: combine(
    colorize(), 
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), 
    new winston.transports.File({ filename: 'logs/combined.log' }) 
  ],
});

export default logger;
