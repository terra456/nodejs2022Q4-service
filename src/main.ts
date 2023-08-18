import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { CustomLogger } from './logger/custom-logger.service';
import { LogLevel } from '@nestjs/common';

const PORT = process.env.PORT || 4000;
const LOG_LEVEL = process.env.LOG_LEVEL || 0;
let logLevel = Number(LOG_LEVEL);
if (typeof logLevel !== 'number') {
  logLevel = 0;
}

const logsArr: Array<LogLevel> = ['error', 'warn', 'log', 'debug', 'verbose'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: logsArr.slice(0, logLevel),
  });
  app.useLogger(app.get(CustomLogger));
  await app.listen(PORT);
  console.log(`Server started at port ${PORT}`);
}
bootstrap();
