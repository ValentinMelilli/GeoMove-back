import { Injectable, Inject } from '@nestjs/common';

import { Sport } from './sport.entity';
import { SportDto } from './dto/sport.dto';
import { SPORT_REPOSITORY } from '../../core/constants';

@Injectable()
export class SportsService {
    constructor(@Inject(SPORT_REPOSITORY) private readonly sportRepository: typeof Sport) { }

    async create(sport: SportDto): Promise<Sport> {
        return await this.sportRepository.create<Sport>({ ...sport });
    }

    async findAll(): Promise<Sport[]> {
        return await this.sportRepository.findAll<Sport>();
    }

    async findOne(id): Promise<Sport> {
        return await this.sportRepository.findOne({
            where: { id },
        });
    }

    async delete(id) {
        return await this.sportRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedSport]] = await this.sportRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedSport };
    }
}