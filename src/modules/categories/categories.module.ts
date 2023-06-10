import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { categoriesProviders } from './categories.providers';

@Module({
  providers: [CategoriesService, ...categoriesProviders],
  exports: [CategoriesService],
})
export class CategoriesModule {}
