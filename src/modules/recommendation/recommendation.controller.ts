import { Controller, Get, Query, Param } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('search')
  async recommendProductsWhenSearch(@Query('term') searchTerm: string) {
    const res =
      await this.recommendationService.recommendProductsWhenSearch(searchTerm);
    return res;
  }

  @Get('category')
  async recommendProductsByCategory(@Query('userId') userId: string) {
    const res =
      await this.recommendationService.recommendProductsByCategory(userId);
    return res;
  }

  @Get(':id')
  async recommendProductsForUser(@Param('id') id: string) {
    const res = await this.recommendationService.recommendProductsForUser(id);
    return res;
  }
}
