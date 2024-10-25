import { Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly productServices: ProductService,
    private readonly userServices: UserService,
    private readonly categoryServices: CategoryService,
  ) {}

  async findAll() {
    const data = await this.productServices.hello();
    const data2 = await this.userServices.hello();
    const data3 = await this.categoryServices.hello();
    return `${data} ${data2} ${data3}`;
  }
}
