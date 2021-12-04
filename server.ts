import * as dotenv from 'dotenv';
import { logger } from './src/logger';
dotenv.config();
import * as http from 'http';
import { App } from './App';
const PORT: number = Number(process.env.PORT) || 3000;
const app: App = new App();
let server: http.Server;
app
  .init()
  .then(() => {
    app.express.set('port', PORT);
    server = app.httpServer;
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(PORT);
  })
  .catch((err: Error) => {
    logger.error(err.name);
    logger.error(err.message);
    logger.error(err.stack);
  });

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  throw error;
}

function serverListening(): void {
  logger.info(`Server listening on : ${PORT} and swagger /docs`);
}

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection: reason:', reason.message);
  logger.error(reason.stack);
  process.exit(1);
});
