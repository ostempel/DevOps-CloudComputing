import { ApiProperty } from '@nestjs/swagger';

export class CreateRacetrackDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  length: string;
}
