import { Module } from '@nestjs/common';

import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { timetablesProviders } from './timetables.providers';

@Module({
  providers: [TimetablesService, ...timetablesProviders],
  controllers: [TimetablesController],
})
export class TimetablesModule {}
