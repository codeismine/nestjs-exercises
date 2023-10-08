import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CATEGORY_REPOSTORY } from 'src/constants/index.constant';
import { CategoryResponseDto } from './dto/response/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSTORY)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const data = await this.categoryRepository.save(createCategoryDto);

    return data;
  }

  async findAll(): Promise<Array<CategoryResponseDto>> {
    const data = await this.categoryRepository.find();

    return data;
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const data = await this.categoryRepository.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Not Found');

    return data;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const foundData = await this.findOne(id);

    if (foundData) {
      foundData.name = updateCategoryDto.name;
      foundData.description = updateCategoryDto.description;

      const data = await this.categoryRepository.save(foundData);

      return data;
    }
  }

  async remove(id: number): Promise<void> {
    const foundData = await this.findOne(id);

    if (foundData) {
      await this.categoryRepository.delete(foundData);
    }
  }
}
