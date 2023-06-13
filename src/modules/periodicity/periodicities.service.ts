import { Injectable, Inject } from '@nestjs/common';

import { Periodicity } from './periodicity.entity';
import { PeriodicityDto } from './dto/periodicity.dto';
import { PERIODICITY_REPOSITORY } from '../../core/constants';

@Injectable()
export class PeriodicitiesService {
    constructor(@Inject(PERIODICITY_REPOSITORY) private readonly periodicityRepository: typeof Periodicity) { }

    async create(periodicity: PeriodicityDto): Promise<Periodicity> {
        return await this.periodicityRepository.create<Periodicity>({ ...periodicity });
    }

    async findAll(): Promise<Periodicity[]> {
        return await this.periodicityRepository.findAll<Periodicity>({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }

    async findOne(id): Promise<Periodicity> {
        return await this.periodicityRepository.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }

    async delete(id) {
        return await this.periodicityRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedPeriodicity]] = await this.periodicityRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedPeriodicity };
    }
}
