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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
@ApiTags('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  createDriver(@Body() createDriverDto: CreateDriverDto) {
    const driver = this.driversService.create(createDriverDto);
    return driver;
  }

  @Get()
  getDrivers() {
    const drivers = this.driversService.getAll();
    return drivers;
  }

  @Get(':id')
  getDriver(@Param('id') id: number) {
    const driver = this.driversService.getOne(id);
    return driver;
  }

  @Patch(':id')
  updateDriver(
    @Param('id') id: number,
    @Body() updateDriverDto: UpdateDriverDto
  ) {
    const updatedDriver = this.driversService.update(id, updateDriverDto);
    return updatedDriver;
  }

  @Delete(':id')
  deleteDriver(@Param('id') id: number) {
    const deletedDriver = this.driversService.delete(id);
    return deletedDriver;
  }
}
