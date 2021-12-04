import { existsSync, mkdirSync } from 'fs';
import * as winston from 'winston';

const logDir: string = './logs';

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

export const logger: any = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${logDir}/combined.log` }),
  ],
});
