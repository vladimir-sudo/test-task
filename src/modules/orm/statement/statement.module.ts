import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './statement.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Statement])],
  providers: [],
  exports: [TypeOrmModule],
})
export class StatementModule {}
