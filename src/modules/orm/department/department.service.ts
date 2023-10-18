import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Department as DepartmentEntity,
  DepartmentRecord,
} from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepo: Repository<DepartmentEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async saveBulk(
    departments: Array<DepartmentRecord>,
  ): Promise<Array<DepartmentRecord>> {
    const entities = departments.map((department) =>
      this.departmentRepo.create(department),
    );
    return await this.dataSource.manager.save(entities);
  }
}
