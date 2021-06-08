import { Module } from '@nestjs/common';
import { RacetracksService } from './racetracks.service';
import { RacetracksController } from './racetracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Racetrack } from './entities/racetrack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Racetrack])],
  providers: [RacetracksService],
  controllers: [RacetracksController],
  exports: [RacetracksService]
})
export class RacetracksModule {}
