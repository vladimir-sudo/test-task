import { DataSource } from 'typeorm';
import { Department } from './src/modules/orm/department/department.entity';
import { Donation } from './src/modules/orm/donation/donation.entity';
import { Employee } from './src/modules/orm/employee/employee.entity';
import { Rate } from './src/modules/orm/rate/rate.entity';
import { Statement } from './src/modules/orm/statement/statement.entity';

import 'dotenv/config';

export default new DataSource({
  type: 'postgres',
  host: process.env.ORM_HOST,
  port: +process.env.ORM_PORT,
  username: process.env.ORM_USERNAME,
  password: process.env.ORM_PASSWORD,
  database: process.env.ORM_DATABASE,
  entities: [Department, Donation, Employee, Rate, Statement],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/src/migrations/*.ts'],
});
