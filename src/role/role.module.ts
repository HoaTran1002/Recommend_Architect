import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RoleProviders } from './role.providers';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService,
    ...RoleProviders
  ],
  exports:[RoleService]
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('role')
  }
}