import { Structure } from './structure.entity';
import { STRUCTURE_REPOSITORY } from '../../core/constants';

export const structuresProviders = [
    {
        provide: STRUCTURE_REPOSITORY,
        useValue: Structure,
    },
];
