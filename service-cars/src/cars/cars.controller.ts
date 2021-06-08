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

import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    const car = this.carsService.create(createCarDto);
    return car;
  }

  @Get()
  getCars() {
    const cars = this.carsService.getAll();
    return cars;
  }

  @Get(':id')
  getCar(@Param('id') id: number) {
    const car = this.carsService.getOne(id);
    return car;
  }

  @Patch(':id')
  updateCar(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    const updatedCar = this.carsService.update(id, updateCarDto);
    return updatedCar;
  }

  @Delete(':id')
  deleteCar(@Param('id') id: number) {
    const deletedCar = this.carsService.delete(id);
    return deletedCar;
  }
}
