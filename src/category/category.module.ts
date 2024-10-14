import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryProviders } from './category.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService,
    ...CategoryProviders
  ],
})
export class CategoryModule {}
