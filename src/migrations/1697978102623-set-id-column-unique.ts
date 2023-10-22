import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetIdColumnUnique1697978102623 implements MigrationInterface {
  name = 'SetIdColumnUnique1697978102623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "statement" ADD CONSTRAINT "UQ_d2ef88cb44b99f3332a1eebb96f" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ADD CONSTRAINT "UQ_25fb5a541964bc5cfc18fb13a82" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "UQ_3c2bc72f03fd5abbbc5ac169498" UNIQUE ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "department" ADD CONSTRAINT "UQ_9a2213262c1593bffb581e382f5" UNIQUE ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "department" DROP CONSTRAINT "UQ_9a2213262c1593bffb581e382f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "UQ_3c2bc72f03fd5abbbc5ac169498"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" DROP CONSTRAINT "UQ_25fb5a541964bc5cfc18fb13a82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" DROP CONSTRAINT "UQ_d2ef88cb44b99f3332a1eebb96f"`,
    );
  }
}
