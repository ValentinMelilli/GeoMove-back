import { Injectable, Inject } from '@nestjs/common';

import { Structure } from './structure.entity';
import { StructureDto } from './dto/structure.dto';
import { Owner } from '../owners/owner.entity';
import { STRUCTURE_REPOSITORY } from '../../core/constants';
import { Timetable } from '../timetables/timetable.entity';
import { Gallery } from '../galleries/gallery.entity';
import { Pricing } from '../pricings/pricing.entity';
import { Sport } from '../sports/sport.entity';
import { Periodicity } from '../periodicity/periodicity.entity';

@Injectable()
export class StructuresService {
    constructor(@Inject(STRUCTURE_REPOSITORY) private readonly structureRepository: typeof Structure) { }

    async create(structure: StructureDto, ownerId): Promise<Structure> {
        return await this.structureRepository.create<Structure>({ ...structure, ownerId });
    }

    async findAll(): Promise<Structure[]> {
        return await this.structureRepository.findAll<Structure>({
            include: [
                { model: Owner, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                { model: Timetable, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                { model: Pricing, attributes: { exclude: ['createdAt', 'updatedAt'] }, include: [
                    { model: Sport, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: Periodicity, attributes: { exclude: ['createdAt', 'updatedAt'] } }
                ] }
            ],
        });
    }

    async findOne(id): Promise<Structure> {
        return await this.structureRepository.findOne({
            where: { id },
            include: [
                { model: Owner },
                { model: Timetable },
                { model: Pricing, include: [
                    { model: Sport, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    { model: Periodicity, attributes: { exclude: ['createdAt', 'updatedAt'] } }
                ] },
                { model : Gallery }
            ],
        });
    }

    async delete(id, ownerId) {
        return await this.structureRepository.destroy({ where: { id, ownerId } });
    }

    async update(id, data, ownerId) {
        const [numberOfAffectedRows, [updatedStructure]] = await this.structureRepository.update({ ...data }, { where: { id, ownerId }, returning: true });
        return { numberOfAffectedRows, updatedStructure };
    }
}
