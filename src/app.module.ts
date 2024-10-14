import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BlacklistTokenModule } from './blacklist-token/blacklist-token.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, BlacklistTokenModule, ProductModule, CategoryModule, RoleModule]
})
export class AppModule implements OnModuleInit {
  constructor(private readonly roleService: RoleService) {}

  async onModuleInit() {
    await this.roleService.findOrCreateDefaultRoles();
  }
}