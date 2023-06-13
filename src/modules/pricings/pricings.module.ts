import { Module } from '@nestjs/common';

import { PricingsService } from './pricings.service';
import { pricingProviders } from './pricings.providers';
import { PricingsController } from './pricings.controller';

@Module({
  providers: [PricingsService, ...pricingProviders],
  controllers: [PricingsController],
})
export class PricingsModule {}
