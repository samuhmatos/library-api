import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableBook1711464123271 implements MigrationInterface {
  private tableName = 'book';

  private columnName1 = 'author_id';
  private columnName2 = 'publisher_id';
  private columnName3 = 'genre_id';
  private columnName4 = 'collection_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'resume',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: this.columnName1,
            type: 'int',
            isNullable: false,
          },
          {
            name: this.columnName2,
            type: 'int',
            isNullable: false,
          },
          {
            name: this.columnName3,
            type: 'int',
            isNullable: false,
          },
          {
            name: this.columnName4,
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: [this.columnName1],
        referencedColumnNames: ['id'],
        referencedTableName: 'author',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: [this.columnName2],
        referencedColumnNames: ['id'],
        referencedTableName: 'publisher',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: [this.columnName3],
        referencedColumnNames: ['id'],
        referencedTableName: 'genre',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: [this.columnName4],
        referencedColumnNames: ['id'],
        referencedTableName: 'collection',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    await Promise.all(
      table.foreignKeys.map(async (fk) => {
        await queryRunner.dropForeignKey(this.tableName, fk);
      }),
    );

    await queryRunner.dropTable(this.tableName);
  }
}
