import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employee/employee.entity';

export interface StatementRecord {
  id: number;
  amount: string;
  date: Date;
}

@Entity()
export class Statement implements StatementRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  amount: string;

  @Column('timestamp')
  date: Date;

  @ManyToOne(() => Employee, (employee) => employee.statements)
  employee: Employee;
}
