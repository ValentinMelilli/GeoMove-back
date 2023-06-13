import { Module } from '@nestjs/common';

import { PeriodicitiesService } from './periodicities.service';
import { periodicityProviders } from './periodicities.providers';

@Module({
  providers: [PeriodicitiesService, ...periodicityProviders],
  exports: [PeriodicitiesService],
})
export class PeriodicitiesModule {}
