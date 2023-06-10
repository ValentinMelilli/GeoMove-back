import { Injectable, Inject } from '@nestjs/common';

import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { CATEGORY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CategoriesService {
    constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: typeof Category) { }

    async create(category: CategoryDto): Promise<Category> {
        return await this.categoryRepository.create<Category>({ ...category });
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll<Category>();
    }

    async findOne(id): Promise<Category> {
        return await this.categoryRepository.findOne({
            where: { id },
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
