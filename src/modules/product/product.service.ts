import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_REPOSITORY } from 'src/utils/constants/services.constants';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: Model<Product>,
  ) {}

  async hello() {
    return 'hello word!';
  }

  async create(createProductDto: CreateProductDto) {
    const record = new this.productRepository(createProductDto);
    const response = await record.save();
    return response;
  }

  async findAll() {
    const response = await this.productRepository.find({});
    return response;
  }

  async findOne(id: string) {
    const record = await this.productRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const record = await this.productRepository.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!record) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return record;
  }

  async remove(id: string) {
    const result = await this.productRepository.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return { message: `Product with id ${id} removed successfully` };
  }
  //tiêu chí tìm kiếm:
  async getProductForHomePage() {}
}
