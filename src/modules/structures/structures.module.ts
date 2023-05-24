import { Module } from '@nestjs/common';

import { StructuresService } from './structures.service';
import { StructuresController } from './structures.controller';
import { structuresProviders } from './structures.providers';

@Module({
  providers: [StructuresService, ...structuresProviders],
  controllers: [StructuresController],
})
export class StructuresModule {}
