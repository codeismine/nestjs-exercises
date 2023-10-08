import { Provider } from '@nestjs/common';
import { CATEGORY_REPOSTORY, DATA_SOURCE } from 'src/constants/index.constant';
import { DataSource } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';

export const categoryProviders: Array<Provider> = [
  {
    provide: CATEGORY_REPOSTORY,
    useFactory: async (datasource: DataSource) =>
      datasource.getRepository(CategoryEntity),
    inject: [DATA_SOURCE],
  },
];
