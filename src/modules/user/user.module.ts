import { forwardRef, Module } from '@nestjs/common';
import { UserProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { BlacklistTokenModule } from 'src/modules/blacklist-token/blacklist-token.module';
import { RoleModule } from 'src/modules/role/role.module';

@Module({
  imports: [
    DatabaseModule,
    BlacklistTokenModule,
    forwardRef(() => AuthModule),
    RoleModule,
  ],
  providers: [...UserProviders, UserService],
  exports: [...UserProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
