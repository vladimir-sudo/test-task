import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRemuneration } from './employee-remuneration.enity';
import { EmployeeRemunerationService } from './employee-remuneration.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRemuneration])],
  providers: [EmployeeRemunerationService],
  exports: [TypeOrmModule, EmployeeRemunerationService],
})
export class EmployeeRemunerationModule {}
