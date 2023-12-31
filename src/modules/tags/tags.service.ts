import { Injectable, Inject } from '@nestjs/common';

import { Tag } from './tag.entity';
import { TagDto } from './dto/tag.dto';
import { TAG_REPOSITORY } from '../../core/constants';
import { Sport } from '../sports/sport.entity';

@Injectable()
export class TagsService {
    constructor(@Inject(TAG_REPOSITORY) private readonly tagRepository: typeof Tag) { }

    async create(tag: TagDto): Promise<Tag> {
        return await this.tagRepository.create<Tag>({ ...tag });
    }

    async findAll(): Promise<Tag[]> {
        return await this.tagRepository.findAll<Tag>({
            include: [{ model: Sport, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }

    async findOne(id): Promise<Tag> {
        return await this.tagRepository.findOne({
            where: { id },
            include: [{ model: Sport, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }

    async delete(id) {
        return await this.tagRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedTag]] = await this.tagRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedTag };
    }
}
