import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { EmployeeRemunerationService } from './employee-remuneration.service';
import { EmployeeRemuneration } from '../orm/employee-remuneration/employee-remuneration.enity';

@Resolver()
export class EmployeeRemunerationResolver {
  constructor(
    private readonly employeeRemunerationService: EmployeeRemunerationService,
  ) {}

  @Query(() => [EmployeeRemuneration])
  employeesRemunerations(
    @Args('pool', { type: () => Int, nullable: true }) pool = 10000,
  ): Promise<EmployeeRemuneration[]> {
    return this.employeeRemunerationService.getEmployeeRemunerations(pool);
  }
}
