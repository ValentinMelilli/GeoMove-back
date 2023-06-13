import { Injectable, Inject } from '@nestjs/common';

import { SportTag } from './sport_tag.entity';
import { SportTagDto } from './dto/sport_tag.dto';
import { SPORTS_TAGS_REPOSITORY } from '../../core/constants';
import { Sport } from '../sports/sport.entity';
import { Tag } from '../tags/tag.entity';

@Injectable()
export class SportsTagsService {
    constructor(@Inject(SPORTS_TAGS_REPOSITORY) private readonly sportTagRepository: typeof SportTag) { }

    async create(sportTag: SportTagDto): Promise<SportTag> {
        return await this.sportTagRepository.create<SportTag>({ ...sportTag });
    }

    async findAll(): Promise<SportTag[]> {
        return await this.sportTagRepository.findAll<SportTag>({
            include: [{ model: Sport }, { model: Tag }],
        });
    }

    async findOne(id): Promise<SportTag> {
        return await this.sportTagRepository.findOne({
            where: { id },
            include: [{ model: Sport }, { model: Tag }],
        });
    }

    async delete(id) {
        return await this.sportTagRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedSportTag]] = await this.sportTagRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedSportTag };
    }
}
