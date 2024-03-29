import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableLoan1711673427816 implements MigrationInterface {
  private tableName = 'loan';

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
            name: 'book_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'loan_date',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
            comment: 'Date when the book was take',
          },
          {
            name: 'due_date',
            type: 'timestamp',
            isNullable: false,
            comment: 'Date that supposed to return the book',
          },
          {
            name: 'return_date',
            type: 'timestamp',
            isNullable: true,
            comment: 'Date when the book really returned',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedTableName: 'book',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);

    await queryRunner.dropForeignKeys(this.tableName, table.foreignKeys);

    await queryRunner.dropTable(this.tableName);
  }
}
