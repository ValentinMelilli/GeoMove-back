import { Injectable, Inject } from '@nestjs/common';

import { Gallery } from './gallery.entity';
import { GalleryDto } from './dto/gallery.dto';
import { Structure } from '../structures/structure.entity';
import { GALLERY_REPOSITORY } from '../../core/constants';

@Injectable()
export class GalleriesService {
    constructor(@Inject(GALLERY_REPOSITORY) private readonly galleryRepository: typeof Gallery) { }

    async create(gallery: GalleryDto, structureId): Promise<Gallery> {
        return await this.galleryRepository.create<Gallery>({ ...gallery, structureId });
    }

    async findAll(): Promise<Gallery[]> {
        return await this.galleryRepository.findAll<Gallery>({
            include: [{ model: Structure }],
        });
    }

    async findOne(id): Promise<Gallery> {
        return await this.galleryRepository.findOne({
            where: { id },
            include: [{ model: Structure }],
        });
    }

    async delete(id, structureId) {
        return await this.galleryRepository.destroy({ where: { id, structureId } });
    }

    async update(id, data, structureId) {
        const [numberOfAffectedRows, [updatedGallery]] = await this.galleryRepository.update({ ...data }, { where: { id, structureId }, returning: true });
        return { numberOfAffectedRows, updatedGallery };
    }
}
