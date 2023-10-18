import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentService],
  exports: [TypeOrmModule, DepartmentService],
})
export class DepartmentModule {}
