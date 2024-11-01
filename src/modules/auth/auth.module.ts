import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistTokenModule } from 'src/modules/blacklist-token/blacklist-token.module';
import { RoleModule } from '../role/role.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, JwtModule, BlacklistTokenModule, RoleModule],
  exports: [AuthService],
})
export class AuthModule {}
