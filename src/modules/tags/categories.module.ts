import { Module } from '@nestjs/common';

import { TagsService } from './tags.service';
import { tagsProviders } from './tags.providers';
import { TagsController } from './tags.controller';

@Module({
  providers: [TagsService, ...tagsProviders],
  controllers: [TagsController],
})
export class TagsModule {}
