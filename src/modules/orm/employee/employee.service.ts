import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee as EmployeeEntity, EmployeeRecord } from './employee.entity';
import { Department, DepartmentRecord } from '../department/department.entity';
import { Donation, DonationRecord } from '../donation/donation.entity';
import { Statement, StatementRecord } from '../statement/statement.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(Statement)
    private readonly statementRepo: Repository<Statement>,
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,
  ) {}

  private upsertConfig = {
    conflictPaths: ['id'],
    skipUpdateIfNoValuesChanged: true,
  };

  async saveEmployees(employees: Array<EmployeeRecord>): Promise<void> {
    const departments = await this.upsertEmployeeDepartments(employees);

    const preparedEmployees = [];

    const statements = [];
    const donations = [];

    employees.forEach((employee: EmployeeRecord) => {
      preparedEmployees.push(this.prepareEmployee(employee, departments));

      this.prepareRelations<DonationRecord>('donations', employee).forEach(
        (donation) => donations.push(donation),
      );

      this.prepareRelations<StatementRecord>('statements', employee).forEach(
        (statement) => statements.push(statement),
      );
    });

    await this.employeeRepo.upsert(preparedEmployees, this.upsertConfig);

    const employeesEntities = await this.getEmployeesByIds(
      employees.map((d) => d.id),
    );

    await this.statementRepo.upsert(
      this.setEmployeesForRelations<StatementRecord>(
        statements,
        employeesEntities,
      ),
      this.upsertConfig,
    );

    await this.donationRepo.upsert(
      this.setEmployeesForRelations<DonationRecord>(
        donations,
        employeesEntities,
      ),
      this.upsertConfig,
    );
  }

  private prepareRelations<T>(
    relationName: string,
    employee: EmployeeRecord,
  ): Array<T> {
    const relations = [];

    for (const relation of employee[relationName]) {
      relation.employee = {
        id: employee.id,
      };
      relations.push(relation);
    }

    return relations;
  }

  private setEmployeesForRelations<T>(
    relations: Array<T>,
    employees: Array<EmployeeRecord>,
  ): Array<T> {
    const relationsEntities = [];

    for (const relation of relations) {
      relation['employee'] = employees.find(
        (e) => e.id === relation['employee'].id,
      );
      relationsEntities.push(relation);
    }
    return relationsEntities;
  }

  private getEmployeesByIds(ids: Array<number>): Promise<EmployeeEntity[]> {
    return this.employeeRepo
      .createQueryBuilder('e')
      .where('e.id IN (:...ids)', { ids })
      .getMany();
  }

  private async upsertEmployeeDepartments(
    employees: Array<EmployeeRecord>,
  ): Promise<DepartmentRecord[]> {
    const departmentsRecords = employees.map((employee) => employee.department);

    await this.departmentRepo.upsert(departmentsRecords, this.upsertConfig);

    return this.departmentRepo
      .createQueryBuilder('d')
      .where('d.id IN (:...ids)', { ids: departmentsRecords.map((d) => d.id) })
      .getMany();
  }

  private prepareEmployee(
    employee: EmployeeRecord,
    departments: Array<DepartmentRecord>,
  ): EmployeeRecord {
    const { id, name, surname } = employee;

    const employeeEntity = this.employeeRepo.create({ id, name, surname });
    employeeEntity.department = departments.find(
      (d) => d.id === employee.department.id,
    );

    return employeeEntity;
  }
}
