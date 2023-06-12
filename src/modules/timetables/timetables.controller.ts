import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TimetablesService } from './timetables.service';
import { Timetable as TimetableEntity } from './timetable.entity';
import { TimetableDto } from './dto/timetable.dto';

@Controller('timetables')
export class TimetablesController {
    constructor(private readonly timetableService: TimetablesService) { }

    @Get()
    async findAll() {
        // get all timetables in the db
        return await this.timetableService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TimetableEntity> {
        // find the timetable with this id
        const timetable = await this.timetableService.findOne(id);

        // if the timetable doesn't exit in the db, throw a 404 error
        if (!timetable) {
            throw new NotFoundException('This Timetable doesn\'t exist');
        }

        // if timetable exist, return the timetable
        return timetable;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() timetable: TimetableDto, @Request() req): Promise<TimetableEntity> {
        // create a new timetable and return the newly created timetable
        return await this.timetableService.create(timetable, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() timetable: TimetableDto, @Request() req): Promise<TimetableEntity> {
        // get the number of row affected and the updated timetable
        const { numberOfAffectedRows, updatedTimetable } = await this.timetableService.update(id, timetable, req.user.id);

        // if the number of row affected is zero, it means the timetable doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Timetable doesn\'t exist');
        }

        // return the updated timetable
        return updatedTimetable;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the timetable with this id
        const deleted = await this.timetableService.delete(id, req.user.id);

        // if the number of row affected is zero, then the timetable doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Timetable doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
