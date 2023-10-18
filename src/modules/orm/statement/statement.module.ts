import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from './statement.entity';
import { StatementService } from './statement.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Statement])],
  providers: [StatementService],
  exports: [TypeOrmModule, StatementService],
})
export class StatementModule {}
