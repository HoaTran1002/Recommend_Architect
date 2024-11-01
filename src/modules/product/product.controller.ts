import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const response = await this.productService.create(createProductDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.productService.findAll();
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pathImage', maxCount: 1 }, // Chỉ cho phép 1 tệp cho hình ảnh
      { name: 'videoUrl', maxCount: 1 }, // Chỉ cho phép 1 tệp cho video
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files: {
      pathImage?: Express.Multer.File[];
      videoUrl?: Express.Multer.File[];
    },
  ) {
    const pathImage = files.pathImage ? files.pathImage[0] : undefined; // Lấy tệp hình ảnh
    const videoUrl = files.videoUrl ? files.videoUrl[0] : undefined; // Lấy tệp video

    return this.productService.update(
      id,
      updateProductDto,
      pathImage,
      videoUrl,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    const response = await this.productService.findByCategory(categoryId);
    return response;
  }
}
