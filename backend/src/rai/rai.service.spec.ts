import { Test, TestingModule } from '@nestjs/testing';
import { RaiService } from './rai.service';

describe('RaiService', () => {
  let service: RaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaiService],
    }).compile();

    service = module.get<RaiService>(RaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
