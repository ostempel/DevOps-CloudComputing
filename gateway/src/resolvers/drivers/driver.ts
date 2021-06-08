import { omitBy } from 'lodash';
import { Context } from 'src/interfaces/Context';
import { Driver } from 'src/interfaces/Entities';

export default {
  Query: {
    async drivers(
      _parent: void,
      _args: null,
      { connections: { driversService } }: Context
    ) {
      return driversService.get('/drivers');
    },
    async driver(
      _parent: void,
      { id }: { id: number },
      { connections: { driversService } }: Context
    ) {
      return driversService.get(`/drivers/${id}`);
    }
  },
  Driver: {},
  Mutation: {
    async createDriver(
      _parent: void,
      { data }: { data: Driver },
      { connections: { driversService } }: Context
    ) {
      return driversService.post(
        '/drivers',
        omitBy(data, v => v === null)
      );
    },
    async updateDriver(
      _parent: void,
      { id, data }: { id: number; data: Driver },
      { connections: { driversService } }: Context
    ) {
      return driversService.patch(
        `/drivers/${id}`,
        omitBy(data, v => v === null)
      );
    },
    async deleteDriver(
      _parent: void,
      { id }: { id: number },
      { connections: { driversService } }: Context
    ) {
      return driversService.delete(`/drivers/${id}`);
    }
  }
};
