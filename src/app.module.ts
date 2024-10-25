import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { BlacklistTokenModule } from './modules/blacklist-token/blacklist-token.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { RoleModule } from './modules/role/role.module';
import { RoleService } from './modules/role/role.service';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    BlacklistTokenModule,
    ProductModule,
    CategoryModule,
    RoleModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly roleService: RoleService) {}

  async onModuleInit() {
    await this.roleService.findOrCreateDefaultRoles();
  }
}
