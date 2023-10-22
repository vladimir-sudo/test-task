import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate as RateEntity, RateRecord } from './rate.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(RateEntity)
    private readonly rateRepository: Repository<RateEntity>,
  ) {}

  public async saveBulk(rates: Array<RateRecord>): Promise<RateRecord[]> {
    const entities = await this.rateRepository.find();

    const ratesEntities = [];

    for (const rate of rates) {
      const entity = entities.find(
        (e) => e.sign === rate.sign && e.date === rate.date,
      );

      if (!entity) {
        ratesEntities.push(this.rateRepository.create(rate));
      } else {
        entity.value = rate.value;

        ratesEntities.push(entity);
      }
    }
    return await this.rateRepository.save(ratesEntities);
  }
}
