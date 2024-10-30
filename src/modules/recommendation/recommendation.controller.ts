import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      // Gọi phương thức từ service để lấy sản phẩm gợi ý
      const res = await this.recommendationService.recommendProductsForUser(
        id,
        [],
      );

      // Trả về kết quả
      return res;
    } catch (error) {
      // Xử lý lỗi, có thể là NotFoundException hoặc lỗi khác
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Không tìm thấy người dùng với ID này');
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình lấy dữ liệu',
      );
    }
  }

  @Get('new') // Đường dẫn cho phương thức đề xuất khóa học mới
  async recommendNewProducts(
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const res = await this.recommendationService.recommendNewProducts(
      cursor,
      limit,
    );
    return res;
  }
}
