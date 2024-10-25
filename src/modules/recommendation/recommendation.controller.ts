import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':id')
  //tiêu chí tìm kiếm : interests, preferredCategories, viewedProducts 
  async findAll(@Param('id') id: string) {
    const res = await this.recommendationService.recommendProductsForUser(id);
    return res;
  }
}
