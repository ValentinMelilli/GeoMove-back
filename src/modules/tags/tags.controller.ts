import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { TagsService } from './tags.service';
import { Tag as TagEntity } from './tag.entity';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagService: TagsService) { }

    @Get()
    async findAll() {
        // get all tags in the db
        return await this.tagService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TagEntity> {
        // find the tag with this id
        const tag = await this.tagService.findOne(id);

        // if the tag doesn't exit in the db, throw a 404 error
        if (!tag) {
            throw new NotFoundException('This Tag doesn\'t exist');
        }

        // if tag exist, return the tag
        return tag;
    }
}
