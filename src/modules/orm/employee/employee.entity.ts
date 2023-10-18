import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';
import { Statement } from '../statement/statement.entity';
import { Donation } from '../donation/donation.entity';

export interface EmployeeRecord {
  id: number;
  name: string;
  surname: string;
  department: Department;
  statements: Statement[];
  donations: Donation[];
}

@Entity()
export class Employee implements EmployeeRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  surname: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    cascade: true,
    nullable: true,
  })
  department: Department;

  @OneToMany(() => Statement, (statement) => statement.employee, {
    cascade: true,
    nullable: true,
  })
  statements: Statement[];

  @OneToMany(() => Donation, (donation) => donation.employee, {
    cascade: true,
    nullable: true,
  })
  donations: Donation[];
}
