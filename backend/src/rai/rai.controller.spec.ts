import { Test, TestingModule } from '@nestjs/testing';
import { RaiController } from './rai.controller';

describe('RaiController', () => {
  let controller: RaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaiController],
    }).compile();

    controller = module.get<RaiController>(RaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
