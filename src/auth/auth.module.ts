import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistTokenModule } from 'src/blacklist-token/blacklist-token.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, JwtModule, BlacklistTokenModule],
  exports: [AuthService],
})
export class AuthModule {}
