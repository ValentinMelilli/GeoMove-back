import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { StructuresModule } from './modules/structures/structures.module';
import { OwnersModule } from './modules/owners/owners.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TimetablesModule } from './modules/timetables/timetables.module';
import { PeriodicitiesModule } from './modules/periodicity/periodicities.module';
import { TagsModule } from './modules/tags/categories.module';
import { GalleriesModule } from './modules/galleries/galleries.module';
import { SportsModule } from './modules/sports/sports.module';
import { SportsTagsModule } from './modules/sports_tags/sports_tags.module';
import { PricingsModule } from './modules/pricings/pricings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    StructuresModule,
    OwnersModule,
    CategoriesModule,
    TimetablesModule,
    PeriodicitiesModule,
    TagsModule,
    GalleriesModule,
    SportsModule,
    SportsTagsModule,
    PricingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
