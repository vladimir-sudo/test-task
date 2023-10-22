import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee, EmployeeRecord } from '../employee/employee.entity';

export interface StatementRecord {
  id: number;
  amount: string;
  date: Date;
  employee: EmployeeRecord;
}

@Entity()
export class Statement implements StatementRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int', unique: true })
  id: number;

  @Column({ type: 'varchar' })
  amount: string;

  @Column('timestamp')
  date: Date;

  @ManyToOne(() => Employee, (employee) => employee.statements)
  employee: EmployeeRecord;
}
