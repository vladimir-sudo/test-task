import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'orm',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.ORM_HOST || 'localhost',
    port: Number(process.env.ORM_PORT || 5432),
    database: process.env.ORM_DATABASE || 'database',
    username: process.env.ORM_USERNAME || 'username',
    password: process.env.ORM_PASSWORD || 'password',
    migrationsTableName: 'migration',
  }),
);
