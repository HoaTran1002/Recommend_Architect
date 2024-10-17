import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistTokenModule } from 'src/blacklist-token/blacklist-token.module';
import { RoleModule } from 'src/role/role.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [DatabaseModule,BlacklistTokenModule,forwardRef(() => AuthModule), RoleModule],
  providers: [...UserProviders,UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('User')
  }
}
