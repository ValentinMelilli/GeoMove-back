import { Owner } from './owner.entity';
import { OWNER_REPOSITORY } from '../../core/constants';

export const ownersProviders = [
    {
        provide: OWNER_REPOSITORY,
        useValue: Owner,
    },
];
