import { Gallery } from './gallery.entity';
import { GALLERY_REPOSITORY } from '../../core/constants';

export const galleriesProviders = [
    {
        provide: GALLERY_REPOSITORY,
        useValue: Gallery,
    },
];
