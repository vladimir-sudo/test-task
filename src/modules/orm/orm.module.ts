import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (config: AppConfigService) => config.dbConfig,
});
@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class OrmModule {}
