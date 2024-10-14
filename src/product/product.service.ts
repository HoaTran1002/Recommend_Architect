import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_REPOSITORY } from 'src/common/services';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@Inject(PRODUCT_REPOSITORY)
  private readonly productRepository: Repository<Product> ){

  }
  async create(createProductDto: CreateProductDto) {
    const record = this.productRepository.create(createProductDto) 
    const response = await this.productRepository.save(record)
    return response
  }

  async findAll() {
    const response = await this.productRepository.find({})
    return response
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
