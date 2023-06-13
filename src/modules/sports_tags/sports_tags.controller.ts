import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { SportsTagsService } from './sports_tags.service';
import { SportTag as SportTagEntity } from './sport_tag.entity';

@Controller('sports-tags')
export class SportsTagsController {
    constructor(private readonly sportTagService: SportsTagsService) { }

    @Get()
    async findAll() {
        // get all sports tags in the db
        return await this.sportTagService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SportTagEntity> {
        // find the sport tag with this id
        const sportTag = await this.sportTagService.findOne(id);

        // if the sport doesn't exit in the db, throw a 404 error
        if (!sportTag) {
            throw new NotFoundException('This Sport Tag doesn\'t exist');
        }

        // if sport exist, return the sport
        return sportTag;
    }
}
