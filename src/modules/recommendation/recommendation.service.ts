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

  async recommendProductsForUser(userId: string, cursor?: string, limit = 10) {
    const user = await this.userRepository.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { interests, preferredCategories, viewedProducts } = user;

    const queryConditions: any = {
      tags: { $in: interests },
      category: { $in: preferredCategories },
      _id: { $nin: viewedProducts },
    };

    if (cursor) {
      queryConditions._id.$gt = cursor;
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

    const products = await this.productRepository
      .find(queryConditions)
      .sort({ _id: 1 })
      .limit(limit)
      .exec();

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
}
