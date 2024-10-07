import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { varsEnv } from './config/env.config';

async function bootstrap() {
  const logger =new Logger('App Module')
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(varsEnv.PORT);
  logger.log(`app runing on port ${varsEnv.PORT}`)
}
bootstrap();
