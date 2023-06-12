import { Injectable, Inject } from '@nestjs/common';

import { Timetable } from './timetable.entity';
import { TimetableDto } from './dto/timetable.dto';
import { Structure } from '../structures/structure.entity';
import { TIMETABLES_REPOSITORY } from '../../core/constants';

@Injectable()
export class TimetablesService {
    constructor(@Inject(TIMETABLES_REPOSITORY) private readonly timetableRepository: typeof Timetable) { }

    async create(timetable: TimetableDto, structureId): Promise<Timetable> {
        return await this.timetableRepository.create<Timetable>({ ...timetable, structureId });
    }

    async findAll(): Promise<Timetable[]> {
        return await this.timetableRepository.findAll<Timetable>({
            include: [{ model: Structure }],
        });
    }

    async findOne(id): Promise<Timetable> {
        return await this.timetableRepository.findOne({
            where: { id },
            include: [{ model: Structure }],
        });
    }

    async delete(id, structureId) {
        return await this.timetableRepository.destroy({ where: { id, structureId } });
    }

    async update(id, data, structureId) {
        const [numberOfAffectedRows, [updatedTimetable]] = await this.timetableRepository.update({ ...data }, { where: { id, structureId }, returning: true });
        return { numberOfAffectedRows, updatedTimetable };
    }
}
