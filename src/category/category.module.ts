import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryProviders } from './category.provider';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService,
    ...CategoryProviders
  ],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('category')
  }
}
