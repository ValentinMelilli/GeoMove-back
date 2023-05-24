import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OwnersService } from './owners.service';
import { Owner as OwnerEntity } from './owner.entity';
import { OwnerDto } from './dto/owner.dto';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownerService: OwnersService) { }

    @Get()
    async findAll() {
        // get all owners in the db
        return await this.ownerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<OwnerEntity> {
        // find the owner with this id
        const owner = await this.ownerService.findOne(id);

        // if the owner doesn't exit in the db, throw a 404 error
        if (!owner) {
            throw new NotFoundException('This Owner doesn\'t exist');
        }

        // if owner exist, return the owner
        return owner;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() owner: OwnerDto, @Request() req): Promise<OwnerEntity> {
        // create a new owner and return the newly created owner
        return await this.ownerService.create(owner, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() owner: OwnerDto, @Request() req): Promise<OwnerEntity> {
        // get the number of row affected and the updated owner
        const { numberOfAffectedRows, updatedOwner } = await this.ownerService.update(id, owner, req.user.id);

        // if the number of row affected is zero, it means the owner doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Owner doesn\'t exist');
        }

        // return the updated owner
        return updatedOwner;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the owner with this id
        const deleted = await this.ownerService.delete(id, req.user.id);

        // if the number of row affected is zero, then the owner doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Owner doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
