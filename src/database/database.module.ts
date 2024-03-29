import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { Collection } from 'src/collection/entities/collection.entity';
import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Loan } from 'src/loan/entities/loan.entity';

import { CreateTableUsers1708892842623 } from './migrations/1708892842623-create-table-users';
import { CreateTableAuthor1711464123269 } from './migrations/1711464123269-create-table-author';
import { CreateTableGenre1711464123267 } from './migrations/1711464123267-create-table-genre';
import { CreateTablePublisher1711464123266 } from './migrations/1711464123266-create-table-publisher';
import { CreateTableCollection1711464123270 } from './migrations/1711464123270-create-table-collection';
import { CreateTableBook1711464123271 } from './migrations/1711464123271-create-table-book';
import { CreateTableLoan1711673427816 } from './migrations/1711673427816-create-table-loan';
import { AddColumnPasswordInTableUser1711721135710 } from './migrations/1711721135710-add-column-password-in-table-user';
import { AddColumnTypeUserInTableUser1711721410316 } from './migrations/1711721410316-add-column-type_user-in-table-user';
import { InsertRootUserInTableUser1711721564024 } from './migrations/1711721564024-insert-root-user-in-table-user';

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
          entities: [User, Book, Collection, Author, Genre, Publisher, Loan],
          migrationsRun: true,
          migrations: [
            CreateTableUsers1708892842623,
            CreateTableAuthor1711464123269,
            CreateTableGenre1711464123267,
            CreateTablePublisher1711464123266,
            CreateTableCollection1711464123270,
            CreateTableBook1711464123271,
            CreateTableLoan1711673427816,
            AddColumnPasswordInTableUser1711721135710,
            AddColumnTypeUserInTableUser1711721410316,
            InsertRootUserInTableUser1711721564024,
          ],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
