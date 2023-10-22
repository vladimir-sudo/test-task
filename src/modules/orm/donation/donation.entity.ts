import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee, EmployeeRecord } from '../employee/employee.entity';

export interface DonationRecord {
  id: number;
  amount: number;
  sign: string;
  date: Date;
  employee: EmployeeRecord;
}

@Entity()
export class Donation implements DonationRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int', unique: true })
  id: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'varchar' })
  sign: string;

  @Column('timestamp')
  date: Date;

  @ManyToOne(() => Employee, (employee) => employee.donations)
  employee: EmployeeRecord;
}
