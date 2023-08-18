import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { CustomLogger } from './logger/custom-logger.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLogger));
  await app.listen(PORT);
  console.log(`Server started at port ${PORT}`);
}
bootstrap();
