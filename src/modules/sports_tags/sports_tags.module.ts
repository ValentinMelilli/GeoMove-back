import { Module } from '@nestjs/common';

import { SportsTagsService } from './sports_tags.service';
import { sportsTagsProviders } from './sports_tags.providers';
import { SportsTagsController } from './sports_tags.controller';

@Module({
  providers: [SportsTagsService, ...sportsTagsProviders],
  controllers: [SportsTagsController],
})
export class SportsTagsModule {}
