import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DepartmentModule {}
