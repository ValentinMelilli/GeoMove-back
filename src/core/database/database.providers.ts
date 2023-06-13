import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Structure } from '../../modules/structures/structure.entity';
import { Owner } from '../../modules/owners/owner.entity';
import { Category } from '../../modules/categories/category.entity';
import { Timetable } from '../../modules/timetables/timetable.entity';
import { Periodicity } from '../../modules/periodicity/periodicity.entity';
import { Tag } from '../../modules/tags/tag.entity';
import { Gallery } from '../../modules/galleries/gallery.entity';
import { Sport } from '../../modules/sports/sport.entity';
import { SportTag } from '../../modules/sports_tags/sport_tag.entity';
import { Pricing } from 'src/modules/pricings/pricing.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Structure, Owner, Category, Timetable, Periodicity, Tag, Gallery, Sport, SportTag, Pricing]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
