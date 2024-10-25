import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProviders } from './product.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, ...ProductProviders],
  exports: [ProductService, ...ProductProviders],
})
export class ProductModule {}
