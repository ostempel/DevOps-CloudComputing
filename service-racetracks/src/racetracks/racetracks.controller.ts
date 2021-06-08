import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRacetrackDto } from './dto/create-racetrack.dto';
import { UpdateRacetrackDto } from './dto/update-racetrack.dto';
import { RacetracksService } from './racetracks.service';

@Controller('racetracks')
@ApiTags('racetracks')
export class RacetracksController {
  constructor(private readonly racetracksService: RacetracksService) {}

  @Post()
  createRacetrack(@Body() createRacetrackDto: CreateRacetrackDto) {
    const racetrack = this.racetracksService.create(createRacetrackDto);
    return racetrack;
  }

  @Get()
  getRacetracks() {
    const racetracks = this.racetracksService.getAll();
    return racetracks;
  }

  @Get(':id')
  getRacetrack(@Param('id') id: number) {
    const racetrack = this.racetracksService.getOne(id);
    return racetrack;
  }

  @Patch(':id')
  updateRacetrack(
    @Param('id') id: number,
    @Body() updateRacetrackDto: UpdateRacetrackDto
  ) {
    const updatedRacetrack = this.racetracksService.update(
      id,
      updateRacetrackDto
    );
    return updatedRacetrack;
  }

  @Delete(':id')
  deleteRacetrack(@Param('id') id: number) {
    const deletedRacetrack = this.racetracksService.delete(id);
    return deletedRacetrack;
  }
}
