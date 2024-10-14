import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_REPOSITORY } from 'src/common/services';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY)
  private readonly categoryRepository : Repository<Category>
){}
  async create(createCategoryDto: CreateCategoryDto) {
    const record = this.categoryRepository.create(createCategoryDto)
    const response = await this.categoryRepository.save(record)
    return response
  }

  async findAll() {
    const response = await this.categoryRepository.find({})
    return response
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
