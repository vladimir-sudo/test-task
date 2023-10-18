import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import { Rate as RateEntity, RateRecord } from './rate.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly rateRepository: Repository<RateEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async saveBulk(rates: Array<RateRecord>): Promise<Array<RateEntity>> {
    const entities = rates.map((rate) => {
      return this.rateRepository.create(rate);
    });
    return await this.dataSource.manager.save(entities);
  }
}
