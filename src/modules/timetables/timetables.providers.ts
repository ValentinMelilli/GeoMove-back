import { Timetable } from './timetable.entity';
import { TIMETABLES_REPOSITORY } from '../../core/constants';

export const timetablesProviders = [
    {
        provide: TIMETABLES_REPOSITORY,
        useValue: Timetable,
    },
];
