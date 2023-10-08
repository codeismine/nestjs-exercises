import { Provider } from '@nestjs/common';
import { DATA_SOURCE } from 'src/constants/index.constant';
import { DataSource } from 'typeorm';

export const databaseProviders: Array<Provider> = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5435,
        username: 'postgres',
        password: '123456',
        database: 'typeorm-category-db',
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
