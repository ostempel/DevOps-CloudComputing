import { omitBy } from 'lodash';
import { Context } from 'src/interfaces/Context';
import { Car } from 'src/interfaces/Entities';

export default {
  Query: {
    async cars(
      _parent: void,
      _args: null,
      { connections: { carsService } }: Context
    ) {
      return await carsService.get('/cars');
    },
    async car(
      _parent: void,
      { id }: { id: number },
      { connections: { carsService } }: Context
    ) {
      return carsService.get(`/cars/${id}`);
    }
  },
  Car: {},
  Mutation: {
    async createCar(
      _parent: void,
      { data }: { data: Car },
      { connections: { carsService } }: Context
    ) {
      return carsService.post(
        '/cars',
        omitBy(data, v => v === null)
      );
    },
    async updateCar(
      _parent: void,
      { id, data }: { id: number; data: Car },
      { connections: { carsService } }: Context
    ) {
      return carsService.patch(
        `/cars/${id}`,
        omitBy(data, v => v === null)
      );
    },
    async deleteCar(
      _parent: void,
      { id }: { id: number },
      { connections: { carsService } }: Context
    ) {
      return carsService.delete(`/cars/${id}`);
    }
  }
};
