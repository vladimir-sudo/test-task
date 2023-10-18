import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  await app.listen(configService.get<number>('app.port'));
}

void bootstrap().then();
