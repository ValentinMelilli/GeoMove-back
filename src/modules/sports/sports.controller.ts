import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { SportsService } from './sports.service';
import { Sport as SportEntity } from './sport.entity';

@Controller('sports')
export class SportsController {
    constructor(private readonly sportService: SportsService) { }

    @Get()
    async findAll() {
        // get all sports in the db
        return await this.sportService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<SportEntity> {
        // find the sport with this id
        const sport = await this.sportService.findOne(id);

        // if the sport doesn't exit in the db, throw a 404 error
        if (!sport) {
            throw new NotFoundException('This Sport doesn\'t exist');
        }

        // if sport exist, return the sport
        return sport;
    }
}
