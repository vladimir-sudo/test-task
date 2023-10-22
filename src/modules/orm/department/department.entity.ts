import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employee/employee.entity';

export interface DepartmentRecord {
  id: number;
  name: string;
}

@Entity()
export class Department implements DepartmentRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int', unique: true })
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
