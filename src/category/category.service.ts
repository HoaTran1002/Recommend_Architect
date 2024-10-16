import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_REPOSITORY } from 'src/common/services';
import mongoose, { Model } from 'mongoose';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const record = new this.categoryRepository(createCategoryDto);
    const response = await record.save();
    return response;
  }

  async findAll() {
    const response = await this.categoryRepository.find({});
    return response;
  }

  async findOne(id: string) {
    const record = await this.categoryRepository.findById(id);
    if (!record) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return record;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const record = await this.categoryRepository.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    if (!record) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return record;
  }

  async remove(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    const record = await this.categoryRepository.findByIdAndDelete(objectId);
    if (!record) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return { message: `Category with id ${id} has been removed` };
  }
}
