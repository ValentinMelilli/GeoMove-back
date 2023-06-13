import { Module } from '@nestjs/common';

import { SportsTagsService } from './sports_tags.service';
import { sportsTagsProviders } from './sports_tags.providers';

@Module({
  providers: [SportsTagsService, ...sportsTagsProviders],
  exports: [SportsTagsService],
})
export class SportsTagsModule {}
