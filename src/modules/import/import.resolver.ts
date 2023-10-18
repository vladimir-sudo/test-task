import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImportService } from './import.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { DoImportResultDto } from './dto/do-import-result.dto';
import { ImportStatusEnum } from './enum/import-status.enum';

@Resolver()
export class ImportResolver {
  constructor(private readonly importService: ImportService) {}

  @Mutation(() => DoImportResultDto)
  async doImport(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const resultDto = new DoImportResultDto();

    try {
      await this.importService.doImport(file);
      resultDto.status = ImportStatusEnum.success;
    } catch (e) {
      resultDto.status = ImportStatusEnum.fail;
      resultDto.message = e.message;
    }
    return resultDto;
  }
}
