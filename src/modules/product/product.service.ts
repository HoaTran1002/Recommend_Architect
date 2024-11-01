/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_REPOSITORY } from 'src/utils/constants/services.constants';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { uploadFileService } from 'src/utils/upload.services';
import { File } from 'buffer';

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

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    pathImage?: Express.Multer.File,
    videoUrl?: Express.Multer.File,
  ) {
    let linkImg = '';
    let linkVideo = '';
    if (pathImage && videoUrl) {
      const imageUploadResponse = await uploadFileService({
        name: updateProductDto.title,
        file: pathImage,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      linkImg = imageUploadResponse.url;

      const videoUploadResponse = await uploadFileService({
        name: updateProductDto.title,
        file: videoUrl,
      });
      console.log(2);
      linkVideo = videoUploadResponse.url;
    }else{
      console.log(123456789)
    }

    const record = await this.productRepository.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    record.pathImage = linkImg;
    record.videoUrl = linkVideo;
    console.log(record);
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
  async findByCategory(categoryId: string) {
    const products = await this.productRepository.find({
      category: categoryId,
    });
    if (!products || products.length === 0) {
      throw new NotFoundException(
        `No products found for category with id ${categoryId}`,
      );
    }
    return products;
  }
}
