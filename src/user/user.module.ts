import { Module } from '@nestjs/common';
import { UserProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProviders,UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
