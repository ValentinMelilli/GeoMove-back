import { Tag } from './tag.entity';
import { TAG_REPOSITORY } from '../../core/constants';

export const tagsProviders = [
    {
        provide: TAG_REPOSITORY,
        useValue: Tag,
    },
];
