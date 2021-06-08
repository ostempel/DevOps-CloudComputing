import { Test, TestingModule } from '@nestjs/testing';
import { RacetracksController } from './racetracks.controller';

describe('RacetracksController', () => {
  let controller: RacetracksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacetracksController],
    }).compile();

    controller = module.get<RacetracksController>(RacetracksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
