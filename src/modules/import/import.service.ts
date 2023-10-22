import {HttpException, Injectable} from '@nestjs/common';
import { ReadStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { ImportFileBlocksEnum } from './enum/import-file-blocks.enum';
import { RateType } from './type/rate.type';
import { RateService } from '../orm/rate/rate.service';
import { RateRecord } from '../orm/rate/rate.entity';
import {
  DepartmentType,
  DonationType,
  EmployeeType,
  SalaryType,
} from './type/employee.type';
import { ImportEntitiesEnum } from './enum/import-entities.enum';
import { EmployeeService } from '../orm/employee/employee.service';
import {HttpErrorByCode} from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class ImportService {
  constructor(
    private readonly rateService: RateService,
    private readonly employeeService: EmployeeService,
  ) {}
  private async streamToString(stream: ReadStream): Promise<string> {
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString('utf-8');
  }

  private prepareProps(
    props: Array<string>,
  ): { [k: string]: string } | undefined {
    let propsObj = {};

    for (const prop of props) {
      const [key, value] = prop.split(':');

      propsObj[key.trim()] = value.trim();
    }

    if (Object.keys(propsObj).length === 0) {
      propsObj = undefined;
    }

    return propsObj;
  }

  private prepareChildren(children: Array<string>): string {
    return children.join('\n').replaceAll('\n  ', '\n').replace('  ', '');
  }

  private parseFileDataRecursive(data: string): Array<any> {
    const lines = data.split('\n').filter((line) => line.trim().length !== 0);

    const result = [];

    let current = null;
    let currentChildren = [];
    let currentProps = [];

    for (const line of lines) {
      if (
        line[0] !== ' ' &&
        current === null &&
        line[0].toUpperCase() === line[0]
      ) {
        current = line.trim();
        continue;
      }

      if (
        line[0] !== ' ' &&
        current !== null &&
        line[0].toUpperCase() === line[0]
      ) {
        const propsObj = this.prepareProps(currentProps);

        result.push({
          name: current,
          props: propsObj,
          children: this.prepareChildren(currentChildren),
        });

        currentChildren = [];
        currentProps = [];
        current = line;

        continue;
      }

      if (line[3] !== ' ' && line.split(':').length === 2) {
        currentProps.push(line);
      } else {
        currentChildren.push(line);
      }
    }

    const propsObj = this.prepareProps(currentProps);

    result.push({
      name: current,
      props: propsObj,
      children: this.prepareChildren(currentChildren),
    });

    const parsedData = [];

    for (const row of result) {
      let resultChild = undefined;

      if (row.children.trim().length > 0) {
        resultChild = this.parseFileDataRecursive(row.children);
      }

      parsedData.push({
        name: row.name,
        props: row.props,
        children: resultChild,
      });
    }

    return parsedData;
  }

  private async importRates(rates: Array<RateType>): Promise<RateRecord[]> {
    const preparedRates = rates
      .filter((rate) => rate.name === ImportEntitiesEnum.rate)
      .map((rate) => {
        return {
          sign: rate.props.sign,
          value: parseFloat(rate.props.value),
          date: new Date(rate.props.date),
        } as unknown as RateRecord;
      });

    return this.rateService.saveBulk(preparedRates);
  }

  private async importEmployees(employees: Array<EmployeeType>): Promise<void> {
    const prepareEmployees = employees
      .filter((employee) => employee.name === ImportEntitiesEnum.employee)
      .map((employee) => {
        const prepareEmployee = {
          id: parseInt(employee.props.id),
          name: employee.props.name,
          surname: employee.props.surname,
          statements: [],
          department: null,
          donations: [],
        };

        for (const child of employee.children) {
          switch (child.name) {
            case ImportEntitiesEnum.salary:
              const salary = child as SalaryType;
              prepareEmployee.statements = salary.children
                .filter(
                  (statement) =>
                    statement.name === ImportEntitiesEnum.statement,
                )
                .map((statement) => {
                  return {
                    id: parseInt(statement.props.id),
                    date: new Date(statement.props.date),
                    amount: statement.props.amount,
                  };
                });
              break;
            case ImportEntitiesEnum.department:
              const department = child as DepartmentType;

              prepareEmployee.department = {
                id: parseInt(department.props.id),
                name: department.props.name,
              };
              break;
            case ImportEntitiesEnum.donation:
              const donation = child as DonationType;

              const [amount, sign] = donation.props.amount.split(' ');

              prepareEmployee.donations.push({
                id: parseInt(donation.props.id),
                date: new Date(donation.props.date),
                amount: parseFloat(amount),
                sign: sign,
              });
              break;
          }
        }

        return prepareEmployee;
      });

    return await this.employeeService.saveEmployees(prepareEmployees);
  }

  public async doImport(file: FileUpload): Promise<void> {
    if (file.mimetype !== 'text/plain') throw new Error('Invalid file format');

    const fileContent = await this.streamToString(file.createReadStream());
    const fileParsedData = this.parseFileDataRecursive(fileContent);

    for (const data of fileParsedData) {
      switch (data.name) {
        case ImportFileBlocksEnum.rates:
          await this.importRates(data.children);
          break;
        case ImportFileBlocksEnum.eList:
          await this.importEmployees(data.children);
          break;
      }
    }
  }
}
