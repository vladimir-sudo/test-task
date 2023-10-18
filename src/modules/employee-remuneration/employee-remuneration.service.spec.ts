import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRemunerationService } from './employee-remuneration.service';

describe('EmployeeRemunerationService', () => {
  let service: EmployeeRemunerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRemunerationService],
    }).compile();

    service = module.get<EmployeeRemunerationService>(EmployeeRemunerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
