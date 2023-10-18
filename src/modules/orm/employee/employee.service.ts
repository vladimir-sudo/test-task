import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Employee as EmployeeEntity, EmployeeRecord } from './employee.entity';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepo: Repository<EmployeeEntity>,
    private readonly departmentService: DepartmentService,
    private readonly dataSource: DataSource,
  ) {}

  async saveBulk(
    employees: Array<EmployeeRecord>,
  ): Promise<Array<EmployeeRecord>> {
    const departments = employees
      .map((employee) => employee.department)
      .filter((d, i, a) => a.findIndex((d2) => d2.id === d.id) === i);

    await this.departmentService.saveBulk(departments);

    const entities = employees.map((employee) => {
      return this.employeeRepo.create(employee);
    });

    return await this.dataSource.manager.save(entities);
  }
}
