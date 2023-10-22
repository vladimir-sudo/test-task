import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface RateRecord {
  date: Date;
  sign: string;
  value: number;
}

@Entity()
export class Rate implements RateRecord {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 300 })
  sign: string;

  @Column('timestamp')
  date: Date;

  @Column('float')
  value: number;
}
