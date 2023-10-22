import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donation.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DonationModule {}
