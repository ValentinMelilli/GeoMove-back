import { Pricing } from './pricing.entity';
import { PRICING_REPOSITORY } from '../../core/constants';

export const pricingProviders = [
    {
        provide: PRICING_REPOSITORY,
        useValue: Pricing,
    },
];
