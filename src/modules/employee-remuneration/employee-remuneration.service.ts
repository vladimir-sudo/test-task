import { Injectable } from '@nestjs/common';
import { EmployeeRemunerationService as EmployeeRemunerationViewService } from '../orm/employee-remuneration/employee-remuneration.service';
import { EmployeeRemuneration } from '../orm/employee-remuneration/employee-remuneration.enity';

@Injectable()
export class EmployeeRemunerationService {
  constructor(
    private readonly employeeRemunerationService: EmployeeRemunerationViewService,
  ) {}

  public async getEmployeeRemunerations(
    pool: number,
  ): Promise<Array<EmployeeRemuneration>> {
    const remunerations = await this.employeeRemunerationService.getAll();

    return remunerations.map((r) => {
      r.remuneration = (pool / 100) * r.remunerationPercentage;
      return r;
    });
  }
}
