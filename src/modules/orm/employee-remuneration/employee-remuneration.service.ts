import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeRemuneration as EmployeeRemunerationEntity } from './employee-remuneration.enity';

@Injectable()
export class EmployeeRemunerationService {
  constructor(
    @InjectRepository(EmployeeRemunerationEntity)
    private readonly employeeRemunerationRepo: Repository<EmployeeRemunerationEntity>,
  ) {}

  public getAll(): Promise<Array<EmployeeRemunerationEntity>> {
    return this.employeeRemunerationRepo.find();
  }
}
