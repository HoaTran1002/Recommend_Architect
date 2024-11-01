import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { Model } from 'mongoose';
import { User } from '../user/entity/user.entity';
import {
  CATEGORY_REPOSITORY,
  PRODUCT_REPOSITORY,
  USER_REPOSITORY,
} from 'src/utils/constants/services.constants';
import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly productServices: ProductService,
    private readonly userServices: UserService,
    private readonly categoryServices: CategoryService,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Model<Product>,
    @Inject(USER_REPOSITORY)
    private userRepository: Model<User>,
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: Model<Category>,
  ) {}

  async recommendProductsForUser(
    userId: string,
    renderedProducts: string[],
    cursor?: string,
    limit = 5,
  ) {
    const user = await this.userRepository.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { interests, preferredCategories, viewedProducts } = user;

    // Điều kiện truy vấn
    const queryConditions: any = {
      tags: { $in: interests },
      category: { $in: preferredCategories },
      _id: { $nin: [...viewedProducts, ...renderedProducts] }, // Không lấy sản phẩm đã xem và đã render
    };

    if (cursor) {
      queryConditions._id.$gt = cursor; // Thêm điều kiện cho cursor
    }

    // Lấy sản phẩm theo điều kiện
    let recommendedProducts = await this.productRepository
      .find(queryConditions)
      .sort({ _id: 1 })
      .limit(limit)
      .exec();

    // Nếu không có sản phẩm phù hợp, lấy ngẫu nhiên sản phẩm khác
    if (recommendedProducts.length === 0) {
      recommendedProducts = await this.productRepository
        .aggregate([
          {
            $match: { _id: { $nin: [...viewedProducts, ...renderedProducts] } },
          }, // Lọc các sản phẩm chưa xem và chưa render
          { $sample: { size: limit } }, // Lấy ngẫu nhiên
        ])
        .exec();
    }

    // Cập nhật nextCursor
    const nextCursor =
      recommendedProducts.length > 0
        ? recommendedProducts[recommendedProducts.length - 1]._id
        : null;

    return {
      userId,
      recommendedProducts,
      nextCursor,
      hasMore: recommendedProducts.length === limit,
    };
  }

  async recommendProductsWhenSearch(
    searchTerm: string,
    cursor?: string,
    limit = 10,
  ) {
    if (!searchTerm) {
      throw new Error('Search term must be provided');
    }

    const queryConditions: any = {
      $or: [
        { name: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
        { description: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
      ],
    };

    if (cursor) {
      queryConditions._id = { $gt: cursor };
    }

    // Tìm kiếm sản phẩm theo searchTerm
    let products = await this.productRepository
      .find(queryConditions)
      .sort({ _id: 1 })
      .limit(limit)
      .exec();

    // Nếu không tìm thấy sản phẩm nào, lấy một danh sách ngẫu nhiên không cần điều kiện
    if (products.length === 0) {
      products = await this.productRepository
        .find({})
        .sort({ _id: 1 })
        .limit(limit)
        .exec();
    }
    // Nếu số lượng tìm thấy ít hơn limit, thêm sản phẩm để đạt đủ limit
    else if (products.length < limit) {
      const additionalProducts = await this.productRepository
        .find({
          _id: { $nin: products.map((product) => product._id) }, // Loại bỏ các sản phẩm đã có
        })
        .sort({ _id: 1 })
        .limit(limit - products.length)
        .exec();

      products = [...products, ...additionalProducts];
    }

    const nextCursor =
      products.length > 0 ? products[products.length - 1]._id : null;

    return {
      searchTerm,
      products,
      nextCursor,
      hasMore: products.length === limit,
    };
  }

  async recommendProductsByCategory(
    userId: string,
    cursor?: string,
    limit = 10,
  ) {
    const user = await this.userRepository.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { preferredCategories } = user;

    const queryConditions: any = {
      category: { $in: preferredCategories },
    };

    if (cursor) {
      queryConditions._id = { $gt: cursor };
    }

    const recommendedProducts = await this.productRepository
      .find(queryConditions)
      .sort({ _id: 1 })
      .limit(limit)
      .exec();

    const nextCursor =
      recommendedProducts.length > 0
        ? recommendedProducts[recommendedProducts.length - 1]._id
        : null;

    return {
      userId,
      recommendedProducts,
      nextCursor,
      hasMore: recommendedProducts.length === limit,
    };
  }
  async recommendNewProducts(cursor?: string, limit = 10) {
    const queryConditions: any = {};

    if (cursor) {
      queryConditions._id = { $gt: cursor };
    }

    // Giả sử bạn có trường createdAt để xác định khóa học mới
    const newProducts = await this.productRepository
      .find(queryConditions)
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo, khóa học mới nhất lên đầu
      .limit(limit)
      .exec();

    const nextCursor =
      newProducts.length > 0 ? newProducts[newProducts.length - 1]._id : null;

    return {
      newProducts,
      nextCursor,
      hasMore: newProducts.length === limit,
    };
  }
}
