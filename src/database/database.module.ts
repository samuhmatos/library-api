import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

import { CreateTableUsers1708892842623 } from './migrations/1708892842623-create-table-users';
import { CreateTableBook1711462465555 } from './migrations/1711462465555-create-table-book';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          port: Number(process.env.DB_PORT),
          host: process.env.DB_HOST,
          password: process.env.DB_PASSWORD,
          username: process.env.DB_USERNAME,
          database: process.env.DB_NAME,
          entities: [User, Book],
          migrationsRun: true,
          migrations: [
            CreateTableUsers1708892842623,
            CreateTableBook1711462465555,
          ],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
