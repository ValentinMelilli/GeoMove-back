import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StructuresService } from './structures.service';
import { Structure as StructureEntity } from './structure.entity';
import { StructureDto } from './dto/structure.dto';

@Controller('structures')
export class StructuresController {
    constructor(private readonly structureService: StructuresService) { }

    @Get()
    async findAll() {
        // get all structures in the db
        return await this.structureService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<StructureEntity> {
        // find the structure with this id
        const structure = await this.structureService.findOne(id);

        // if the structure doesn't exit in the db, throw a 404 error
        if (!structure) {
            throw new NotFoundException('This Structure doesn\'t exist');
        }

        // if structure exist, return the structure
        return structure;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() structure: StructureDto, @Request() req): Promise<StructureEntity> {
        // create a new structure and return the newly created structure
        return await this.structureService.create(structure, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() structure: StructureDto, @Request() req): Promise<StructureEntity> {
        // get the number of row affected and the updated structure
        const { numberOfAffectedRows, updatedStructure } = await this.structureService.update(id, structure, req.user.id);

        // if the number of row affected is zero, it means the structure doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Structure doesn\'t exist');
        }

        // return the updated structure
        return updatedStructure;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the structure with this id
        const deleted = await this.structureService.delete(id, req.user.id);

        // if the number of row affected is zero, then the structure doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Structure doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
