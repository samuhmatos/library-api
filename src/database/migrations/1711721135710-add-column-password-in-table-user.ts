import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPasswordInTableUser1711721135710
  implements MigrationInterface
{
  private tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'password');
  }
}
