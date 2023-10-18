import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1697653118446 implements MigrationInterface {
  name = 'InitialMigration1697653118446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "statement" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "amount" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "employeeUuid" uuid, CONSTRAINT "PK_a8b3742f4f32e27ff0486f00ccf" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "donation" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "amount" double precision NOT NULL, "sign" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "employeeUuid" uuid, CONSTRAINT "PK_6237e7c474d82596a8066b6ad41" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "name" character varying(300) NOT NULL, "surname" character varying(300) NOT NULL, "departmentUuid" uuid, CONSTRAINT "PK_54452b02a5a8c125422e3697495" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "department" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" integer NOT NULL, "name" character varying(300) NOT NULL, CONSTRAINT "PK_cf9e422063fd1b4a6b6a15c936f" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rate" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "sign" character varying(300) NOT NULL, "date" TIMESTAMP NOT NULL, "value" double precision NOT NULL, CONSTRAINT "PK_e45f8a67e6f74643385bab6b76e" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" ADD CONSTRAINT "FK_3b381ea5b659d98fc9c48009c63" FOREIGN KEY ("employeeUuid") REFERENCES "employee"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" ADD CONSTRAINT "FK_f7c94938da5a34c7ed779904e1f" FOREIGN KEY ("employeeUuid") REFERENCES "employee"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_ad01aca960801e29520bae3548c" FOREIGN KEY ("departmentUuid") REFERENCES "department"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_ad01aca960801e29520bae3548c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "donation" DROP CONSTRAINT "FK_f7c94938da5a34c7ed779904e1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statement" DROP CONSTRAINT "FK_3b381ea5b659d98fc9c48009c63"`,
    );
    await queryRunner.query(`DROP TABLE "rate"`);
    await queryRunner.query(`DROP TABLE "department"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "donation"`);
    await queryRunner.query(`DROP TABLE "statement"`);
  }
}
