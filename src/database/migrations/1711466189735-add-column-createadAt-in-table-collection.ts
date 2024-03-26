import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCreateadAtInTableCollection1711466189735
  implements MigrationInterface
{
  private tableName = 'collection';
  private columnName = 'created_at';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.columnName);
  }
}
