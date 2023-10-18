import { ViewColumn, ViewEntity } from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

export interface EmployeeRemunerationRecord {
  uuid: string;
  id: number;
  name: string;
  surname: string;
}

@ViewEntity({ name: 'employees_remuneration' })
@ObjectType()
export class EmployeeRemuneration implements EmployeeRemunerationRecord {
  @ViewColumn()
  @Field(() => String)
  uuid: string;

  @ViewColumn()
  @Field(() => Int)
  id: number;

  @ViewColumn()
  @Field(() => String)
  name: string;

  @ViewColumn()
  @Field(() => String)
  surname: string;

  @ViewColumn({ name: 'employee_remuneration_percentage' })
  @Field(() => Float, { nullable: true })
  remunerationPercentage: number;

  @Field(() => Float, { nullable: true })
  remuneration: number = null;
}
