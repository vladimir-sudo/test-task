import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './rate.entity';
import { RateService } from './rate.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RateService],
  exports: [TypeOrmModule, RateService],
})
export class RateModule {}
