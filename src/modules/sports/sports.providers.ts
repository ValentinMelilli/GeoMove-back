import { Sport } from './sport.entity';
import { SPORT_REPOSITORY } from '../../core/constants';

export const sportsProviders = [
    {
        provide: SPORT_REPOSITORY,
        useValue: Sport,
    },
];
