import { Injectable, Inject } from '@nestjs/common';

import { Structure } from './structure.entity';
import { StructureDto } from './dto/structure.dto';
import { Owner } from '../owners/owner.entity';
import { STRUCTURE_REPOSITORY } from '../../core/constants';

@Injectable()
export class StructuresService {
    constructor(@Inject(STRUCTURE_REPOSITORY) private readonly structureRepository: typeof Structure) { }

    async create(structure: StructureDto, ownerId): Promise<Structure> {
        return await this.structureRepository.create<Structure>({ ...structure, ownerId });
    }

    async findAll(): Promise<Structure[]> {
        return await this.structureRepository.findAll<Structure>({
            include: [{ model: Owner }],
        });
    }

    async findOne(id): Promise<Structure> {
        return await this.structureRepository.findOne({
            where: { id },
            include: [{ model: Owner }],
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
