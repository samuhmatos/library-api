import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnCollectionIdInTableCollection1711464743365
  implements MigrationInterface
{
  private tableName = 'book';
  private columnName = 'collection_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: [this.columnName],
        referencedColumnNames: ['id'],
        referencedTableName: 'collection',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf(this.columnName) !== -1,
    );
    await queryRunner.dropForeignKey(this.tableName, foreignKey);
    await queryRunner.dropColumn(this.tableName, this.columnName);
  }
}
