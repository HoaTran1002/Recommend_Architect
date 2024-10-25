import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService],
  imports: [UserModule, ProductModule, CategoryModule],
})
export class RecommendationModule {}
