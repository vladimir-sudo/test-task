import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportResolver } from './import.resolver';

@Module({
  providers: [ImportResolver, ImportService],
})
export class ImportModule {}
