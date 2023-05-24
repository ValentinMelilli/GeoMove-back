import { Module } from '@nestjs/common';

import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { ownersProviders } from './owners.providers';

@Module({
  providers: [OwnersService, ...ownersProviders],
  controllers: [OwnersController],
})
export class OwnersModule {}
