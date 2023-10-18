import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRemunerationResolver } from './employee-remuneration.resolver';
import { EmployeeRemunerationService } from './employee-remuneration.service';

describe('EmployeeRemunerationResolver', () => {
  let resolver: EmployeeRemunerationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRemunerationResolver, EmployeeRemunerationService],
    }).compile();

    resolver = module.get<EmployeeRemunerationResolver>(EmployeeRemunerationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
