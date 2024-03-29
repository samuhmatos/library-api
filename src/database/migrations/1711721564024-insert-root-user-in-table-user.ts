import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRootUserInTableUser1711721564024
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public."user"(
        name, email, phone, address, password, type_user)
        VALUES ('root', 'root@root.com', '12345678901', 'demo', '$2b$10$UQ/qZQ/jRwhymdekD6CuLe5DkXFXmgDsjAODXNyTR4pV46vO1/kjK', 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@root.com';
        `);
  }
}
