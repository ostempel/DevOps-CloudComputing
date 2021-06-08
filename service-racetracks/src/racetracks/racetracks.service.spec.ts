import { Test, TestingModule } from '@nestjs/testing';
import { RacetracksService } from './racetracks.service';

describe('RacetracksService', () => {
  let service: RacetracksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacetracksService],
    }).compile();

    service = module.get<RacetracksService>(RacetracksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
