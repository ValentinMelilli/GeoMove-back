import { Injectable, Inject } from '@nestjs/common';

import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { Sport } from '../sports/sport.entity';
import { CATEGORY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CategoriesService {
    constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: typeof Category) { }

    async create(category: CategoryDto): Promise<Category> {
        return await this.categoryRepository.create<Category>({ ...category });
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll<Category>({
            include: [{ model: Sport }],
        });
    }

    async findOne(id): Promise<Category> {
        return await this.categoryRepository.findOne({
            where: { id },
            include: [{ model: Sport }],
        });
    }

    async delete(id) {
        return await this.categoryRepository.destroy({ where: { id } });
    }

    async update(id, data) {
        const [numberOfAffectedRows, [updatedCategory]] = await this.categoryRepository.update({ ...data }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedCategory };
    }
}
