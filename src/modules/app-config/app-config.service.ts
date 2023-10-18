import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(public config: ConfigService) {}

  public get dbConfig(): TypeOrmModuleOptions {
    return {
      type: this.config.get<'mysql' | 'mariadb' | 'postgres'>('orm.type'),
      host: this.config.get<string>('orm.host'),
      port: this.config.get<number>('orm.port'),
      database: this.config.get<string>('orm.database'),
      username: this.config.get<string>('orm.username'),
      password: this.config.get<string>('orm.password'),
      autoLoadEntities: true,
      migrationsTableName: this.config.get<string>('orm.migrationsTableName'),
    };
  }
}
