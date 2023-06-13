import { SportTag } from './sport_tag.entity';
import { SPORTS_TAGS_REPOSITORY } from '../../core/constants';

export const sportsTagsProviders = [
    {
        provide: SPORTS_TAGS_REPOSITORY,
        useValue: SportTag,
    },
];
