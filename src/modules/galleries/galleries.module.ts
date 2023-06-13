import { Module } from '@nestjs/common';

import { GalleriesService } from './galleries.service';
import { GalleriesController } from './galleries.controller';
import { galleriesProviders } from './galleries.providers';

@Module({
  providers: [GalleriesService, ...galleriesProviders],
  controllers: [GalleriesController],
})
export class GalleriesModule {}
