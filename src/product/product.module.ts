import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProviders } from './product.providers';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService,
    ...ProductProviders
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('product')
  }
}
