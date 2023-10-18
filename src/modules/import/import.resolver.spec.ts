import { Test, TestingModule } from '@nestjs/testing';
import { ImportResolver } from './import.resolver';
import { ImportService } from './import.service';

describe('ImportResolver', () => {
  let resolver: ImportResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportResolver, ImportService],
    }).compile();

    resolver = module.get<ImportResolver>(ImportResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
