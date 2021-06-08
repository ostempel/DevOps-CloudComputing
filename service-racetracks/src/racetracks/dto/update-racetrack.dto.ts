import { PartialType } from '@nestjs/swagger';
import { CreateRacetrackDto } from './create-racetrack.dto';

export class UpdateRacetrackDto extends PartialType(CreateRacetrackDto) {}
