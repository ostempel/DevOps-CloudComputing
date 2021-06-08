import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'lodash';
import { Repository, Connection } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    private connection: Connection
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    return this.connection.transaction(async trm => {
      const newDriver = this.driverRepository.create({ ...createDriverDto });
      const driver = await trm.save(newDriver);
      return driver;
    });
  }

  async getAll() {
    return this.driverRepository.find();
  }

  async getOne(id: number) {
    const driver = await this.driverRepository.findOne(id);

    if (!driver) {
      throw new NotFoundException();
    }
    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOne(id);
    const updateDriver = updateDriverDto;

    if (!driver) {
      throw new NotFoundException();
    }

    const saveDriver = this.driverRepository.save(merge(driver, updateDriver));
    return saveDriver;
  }

  async delete(id: number) {
    const driver = await this.driverRepository.findOne(id);

    if (!driver) {
      throw new NotFoundException();
    }
    await this.driverRepository.delete(id);
    return driver;
  }
}
