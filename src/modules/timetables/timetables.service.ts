import { Injectable, Inject } from '@nestjs/common';

import { Timetable } from './timetable.entity';
import { TimetableDto } from './dto/timetable.dto';
import { Owner } from '../owners/owner.entity';
import { TIMETABLES_REPOSITORY } from '../../core/constants';

@Injectable()
export class TimetablesService {
    constructor(@Inject(TIMETABLES_REPOSITORY) private readonly timetableRepository: typeof Timetable) { }

    async create(timetable: TimetableDto, ownerId): Promise<Timetable> {
        return await this.timetableRepository.create<Timetable>({ ...timetable, ownerId });
    }

    async findAll(): Promise<Timetable[]> {
        return await this.timetableRepository.findAll<Timetable>({
            include: [{ model: Owner }],
        });
    }

    async findOne(id): Promise<Timetable> {
        return await this.timetableRepository.findOne({
            where: { id },
            include: [{ model: Owner }],
        });
    }

    async delete(id, ownerId) {
        return await this.timetableRepository.destroy({ where: { id, ownerId } });
    }

    async update(id, data, ownerId) {
        const [numberOfAffectedRows, [updatedTimetable]] = await this.timetableRepository.update({ ...data }, { where: { id, ownerId }, returning: true });
        return { numberOfAffectedRows, updatedTimetable };
    }
}
