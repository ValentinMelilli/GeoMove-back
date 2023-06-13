import { Module } from '@nestjs/common';

import { PeriodicitiesService } from './periodicities.service';
import { periodicityProviders } from './periodicities.providers';
import { PeriodocitiesController } from './periodicities.controller';

@Module({
  providers: [PeriodicitiesService, ...periodicityProviders],
  controllers: [PeriodocitiesController],
})
export class PeriodicitiesModule {}
