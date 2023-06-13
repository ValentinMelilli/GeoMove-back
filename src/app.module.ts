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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
