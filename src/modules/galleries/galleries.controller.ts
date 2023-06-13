import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GalleriesService } from './galleries.service';
import { Gallery as GalleryEntity } from './gallery.entity';
import { GalleryDto } from './dto/gallery.dto';

@Controller('galleries')
export class GalleriesController {
    constructor(private readonly galleryService: GalleriesService) { }

    @Get()
    async findAll() {
        // get all galleries in the db
        return await this.galleryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<GalleryEntity> {
        // find the gallery with this id
        const gallery = await this.galleryService.findOne(id);

        // if the gallery doesn't exit in the db, throw a 404 error
        if (!gallery) {
            throw new NotFoundException('This Gallery doesn\'t exist');
        }

        // if gallery exist, return the gallery
        return gallery;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() gallery: GalleryDto, @Request() req): Promise<GalleryEntity> {
        // create a new gallery and return the newly created gallery
        return await this.galleryService.create(gallery, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() gallery: GalleryDto, @Request() req): Promise<GalleryEntity> {
        // get the number of row affected and the updated gallery
        const { numberOfAffectedRows, updatedGallery } = await this.galleryService.update(id, gallery, req.user.id);

        // if the number of row affected is zero, it means the gallery doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Gallery doesn\'t exist');
        }

        // return the updated gallery
        return updatedGallery;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the gallery with this id
        const deleted = await this.galleryService.delete(id, req.user.id);

        // if the number of row affected is zero, then the gallery doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Gallery doesn\'t exist');
        }

        // return success message
        return 'Successfully deleted';
    }
}
