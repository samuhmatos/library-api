import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTypeUserInTableUser1711721410316
  implements MigrationInterface
{
  private tableName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'type_user',
        type: 'int',
        isNullable: false,
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'type_user');
  }
}
