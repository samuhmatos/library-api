import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1708892842623 implements MigrationInterface {
  private columnName = 'user';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.columnName,
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.columnName);
  }
}
