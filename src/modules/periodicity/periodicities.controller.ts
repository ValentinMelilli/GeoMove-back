import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

import { PeriodicitiesService } from './periodicities.service';
import { Periodicity as PeriodicityEntity } from './periodicity.entity';

@Controller('periodicities')
export class PeriodocitiesController {
    constructor(private readonly periodicityService: PeriodicitiesService) { }

    @Get()
    async findAll() {
        // get all periodicities in the db
        return await this.periodicityService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PeriodicityEntity> {
        // find the periodicity with this id
        const periodicity = await this.periodicityService.findOne(id);

        // if the periodicity doesn't exit in the db, throw a 404 error
        if (!periodicity) {
            throw new NotFoundException('This Periodicity doesn\'t exist');
        }

        // if periodicity exist, return the periodicity
        return periodicity;
    }
}
