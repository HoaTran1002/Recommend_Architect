import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BlacklistTokenModule } from './blacklist-token/blacklist-token.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, BlacklistTokenModule]
})
export class AppModule {}
