import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeeRemunerationViewMigration1697653219302
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE OR REPLACE VIEW employees_remuneration AS (
                    SELECT
                        e.uuid,
                        e.id,
                        e.name,
                        e.surname,
                        (
                            (
                                SELECT
                                    SUM(
                                        CASE
                                            WHEN d.sign = 'USD' THEN d.amount
                                            ELSE d.amount * r.value
                                        END
                                    )
                                FROM donation d
                                     LEFT JOIN rate r ON d.date = r.date AND r.sign = d.sign
                                        WHERE d."employeeUuid" = e.uuid
                                          AND
                                            CASE
                                                WHEN d.sign = 'USD' THEN d.amount
                                                ELSE d.amount * r.value
                                            END >= 100
                            ) * 100 / (
                                SELECT
                                    SUM(
                                        CASE
                                            WHEN d.sign = 'USD' THEN d.amount
                                            ELSE d.amount * r.value
                                        END
                                    )
                                FROM donation d
                                    LEFT JOIN rate r ON d.date = r.date AND r.sign = d.sign
                            )
                        ) AS employee_remuneration_percentage
                    FROM employee e
                )
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS employees_remuneration`);
  }
}
