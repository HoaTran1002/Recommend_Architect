import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { varsEnv } from './config/env.config';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const logger = new Logger('App Module');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(varsEnv.port);
  logger.log(`app runing on port: http://localhost:${varsEnv.port}`);
}
bootstrap();
