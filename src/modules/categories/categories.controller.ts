import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Category as CategoryEntity } from './category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Get()
    async findAll() {
        // get all categories in the db
        return await this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CategoryEntity> {
        // find the category with this id
        const category = await this.categoryService.findOne(id);

        // if the category doesn't exit in the db, throw a 404 error
        if (!category) {
            throw new NotFoundException('This Category doesn\'t exist');
        }

        // if category exist, return the category
        return category;
    }
}
