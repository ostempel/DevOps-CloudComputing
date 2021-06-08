import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'lodash';
import { Connection, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    private connection: Connection
  ) {}

  async create(createCarDto: CreateCarDto) {
    return this.connection.transaction(async trm => {
      const newCar = this.carRepository.create({
        ...createCarDto
      });
      const car = await trm.save(newCar);
      return car;
    });
  }

  async getAll() {
    return this.carRepository.find();
  }

  async getOne(id: number) {
    const car = await this.carRepository.findOne(id);

    if (!car) {
      throw new NotFoundException();
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.findOne(id);
    const updateCar = updateCarDto;

    if (!car) {
      throw new NotFoundException();
    }

    const saveCar = this.carRepository.save(merge(car, updateCar));
    return saveCar;
  }

  async delete(id: number) {
    const car = await this.carRepository.findOne(id);

    if (!car) {
      throw new NotFoundException();
    }
    await this.carRepository.delete(id);
    return car;
  }
}
