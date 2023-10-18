import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statement as StatementEntity } from './statement.entity';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(StatementEntity)
    private readonly StatementRepo: Repository<StatementEntity>,
  ) {}
}
