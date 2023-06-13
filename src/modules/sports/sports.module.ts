import { Module } from '@nestjs/common';

import { SportsService } from './sports.service';
import { sportsProviders } from './sports.providers';
import { SportsController } from './sports.controller';

@Module({
  providers: [SportsService, ...sportsProviders],
  controllers: [SportsController],
})
export class SportsModule {}
