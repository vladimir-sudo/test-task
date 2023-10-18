import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
