import configApp from './config/app.config';
import configOrm from './config/orm.config';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { OrmModule } from './modules/orm/orm.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ImportModule } from './modules/import/import.module';
import { EmployeeModule } from './modules/orm/employee/employee.module';
import { StatementModule } from './modules/orm/statement/statement.module';
import { DepartmentModule } from './modules/orm/department/department.module';
import { DonationModule } from './modules/orm/donation/donation.module';
import { RateModule } from './modules/orm/rate/rate.module';
import { EmployeeRemunerationModule as EmployeeRemunerationViewModule } from './modules/orm/employee-remuneration/employee-remuneration.module';
import { EmployeeRemunerationModule } from './modules/employee-remuneration/employee-remuneration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configApp, configOrm],
      expandVariables: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: true,
    }),
    OrmModule,
    AppConfigModule,
    ImportModule,
    EmployeeModule,
    StatementModule,
    DepartmentModule,
    DonationModule,
    RateModule,
    EmployeeRemunerationViewModule,
    EmployeeRemunerationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
