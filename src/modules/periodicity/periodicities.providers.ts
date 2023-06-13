import { Periodicity } from './periodicity.entity';
import { PERIODICITY_REPOSITORY } from '../../core/constants';

export const periodicityProviders = [
    {
        provide: PERIODICITY_REPOSITORY,
        useValue: Periodicity,
    },
];
