import { Module } from '@nestjs/common';
import { EmployeeRemunerationService } from './employee-remuneration.service';
import { EmployeeRemunerationResolver } from './employee-remuneration.resolver';

@Module({
  providers: [EmployeeRemunerationResolver, EmployeeRemunerationService]
})
export class EmployeeRemunerationModule {}
