import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [CategoryModule, DatabaseModule],
})
export class AppModule {}
