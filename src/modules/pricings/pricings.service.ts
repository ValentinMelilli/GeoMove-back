import { Injectable, Inject } from '@nestjs/common';

import { Pricing } from './pricing.entity';
import { PricingDto } from './dto/pricing.dto';
import { PRICING_REPOSITORY } from '../../core/constants';
import { Periodicity } from '../periodicity/periodicity.entity';
import { Structure } from '../structures/structure.entity';
import { Sport } from '../sports/sport.entity';

@Injectable()
export class PricingsService {
    constructor(@Inject(PRICING_REPOSITORY) private readonly pricingRepository: typeof Pricing) { }

    async create(pricing: PricingDto, structureId): Promise<Pricing> {
        return await this.pricingRepository.create<Pricing>({ ...pricing, structureId });
    }

    async findAll(): Promise<Pricing[]> {
        return await this.pricingRepository.findAll<Pricing>({
            include: [{ model: Structure }, { model: Sport }, { model: Periodicity }],
        });
    }

    async findOne(id): Promise<Pricing> {
        return await this.pricingRepository.findOne({
            where: { id },
            include: [{ model: Structure }, { model: Sport }, { model: Periodicity }],
        });
    }

    async delete(id, structureId) {
        return await this.pricingRepository.destroy({ where: { id, structureId } });
    }

    async update(id, data, structureId) {
        const [numberOfAffectedRows, [updatedPricing]] = await this.pricingRepository.update({ ...data }, { where: { id, structureId }, returning: true });
        return { numberOfAffectedRows, updatedPricing };
    }
}
