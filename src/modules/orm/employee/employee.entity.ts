import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department, DepartmentRecord } from '../department/department.entity';
import { Statement, StatementRecord } from '../statement/statement.entity';
import { Donation, DonationRecord } from '../donation/donation.entity';

export interface EmployeeRecord {
  id: number;
  name: string;
  surname: string;
  department: DepartmentRecord;
  statements: StatementRecord[];
  donations: DonationRecord[];
}

@Entity()
export class Employee implements EmployeeRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int', unique: true })
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  surname: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    cascade: true,
    nullable: true,
  })
  department: DepartmentRecord;

  @OneToMany(() => Statement, (statement) => statement.employee, {
    cascade: true,
    nullable: true,
  })
  statements: StatementRecord[];

  @OneToMany(() => Donation, (donation) => donation.employee, {
    cascade: true,
    nullable: true,
  })
  donations: DonationRecord[];
}
