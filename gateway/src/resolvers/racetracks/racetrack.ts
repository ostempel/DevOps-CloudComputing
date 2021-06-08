import { omitBy } from 'lodash';
import { Context } from 'src/interfaces/Context';
import { Racetrack } from 'src/interfaces/Entities';

export default {
  Query: {
    async racetracks(
      _parent: void,
      _args: null,
      { connections: { racetracksService } }: Context
    ) {
      return racetracksService.get('/racetracks');
    },
    async racetrack(
      _parent: void,
      { id }: { id: number },
      { connections: { racetracksService } }: Context
    ) {
      return racetracksService.get(`/racetracks/${id}`);
    }
  },
  Racetrack: {},
  Mutation: {
    async createRacetrack(
      _parent: void,
      { data }: { data: Racetrack },
      { connections: { racetracksService } }: Context
    ) {
      return racetracksService.post(
        '/racetracks',
        omitBy(data, v => v === null)
      );
    },
    async updateRacetrack(
      _parent: void,
      { id, data }: { id: number; data: Racetrack },
      { connections: { racetracksService } }: Context
    ) {
      return racetracksService.patch(
        `/racetracks/${id}`,
        omitBy(data, v => v === null)
      );
    },
    async deleteRacetrack(
      _parent: void,
      { id }: { id: number },
      { connections: { racetracksService } }: Context
    ) {
      return racetracksService.delete(`/racetracks/${id}`);
    }
  }
};
