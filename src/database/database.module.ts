import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { Collection } from 'src/collection/entities/collection.entity';

import { CreateTableUsers1708892842623 } from './migrations/1708892842623-create-table-users';
import { CreateTableBook1711462465555 } from './migrations/1711462465555-create-table-book';
import { CreateTableCollection1711464123270 } from './migrations/1711464123270-create-table-collection';
import { AddColumnCollectionIdInTableCollection1711464743365 } from './migrations/1711464743365-add-column-collection-id-in-table-collection';
import { AddColumnCreateadAtInTableCollection1711466189735 } from './migrations/1711466189735-add-column-createadAt-in-table-collection';

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
          entities: [User, Book, Collection],
          migrationsRun: true,
          migrations: [
            CreateTableUsers1708892842623,
            CreateTableBook1711462465555,
            CreateTableCollection1711464123270,
            AddColumnCollectionIdInTableCollection1711464743365,
            AddColumnCreateadAtInTableCollection1711466189735,
          ],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
