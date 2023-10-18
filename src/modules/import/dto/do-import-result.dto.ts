import { Field, ObjectType } from '@nestjs/graphql';
import { ImportStatusEnum } from '../enum/import-status.enum';

@ObjectType()
export class DoImportResultDto {
  @Field()
  status: ImportStatusEnum;

  @Field({ nullable: true })
  message?: string;
}
