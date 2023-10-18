import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { DonationService } from './donation.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  providers: [DonationService],
  exports: [TypeOrmModule, DonationService],
})
export class DonationModule {}
