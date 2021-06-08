import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'lodash';
import { Repository, Connection } from 'typeorm';
import { CreateRacetrackDto } from './dto/create-racetrack.dto';
import { UpdateRacetrackDto } from './dto/update-racetrack.dto';
import { Racetrack } from './entities/racetrack.entity';

@Injectable()
export class RacetracksService {
  constructor(
    @InjectRepository(Racetrack)
    private racetrackRepository: Repository<Racetrack>,
    private connection: Connection
  ) {}

  async create(createRacetrack: CreateRacetrackDto) {
    return this.connection.transaction(async trm => {
      const newRacetrack = this.racetrackRepository.create({
        ...createRacetrack
      });
      const racetrack = await trm.save(newRacetrack);
      return racetrack;
    });
  }

  async getAll() {
    return this.racetrackRepository.find();
  }

  async getOne(id: number) {
    const racetrack = await this.racetrackRepository.findOne(id);

    if (!racetrack) {
      throw new NotFoundException();
    }
    return racetrack;
  }

  async update(id: number, updateRacetrackDto: UpdateRacetrackDto) {
    const racetrack = await this.racetrackRepository.findOne(id);
    const updateRacetrack = updateRacetrackDto;

    if (!racetrack) {
      throw new NotFoundException();
    }

    const saveDriver = this.racetrackRepository.save(
      merge(racetrack, updateRacetrack)
    );
    return saveDriver;
  }

  async delete(id: number) {
    const racetrack = await this.racetrackRepository.findOne(id);

    if (!racetrack) {
      throw new NotFoundException();
    }
    await this.racetrackRepository.delete(id);
    return racetrack;
  }
}
