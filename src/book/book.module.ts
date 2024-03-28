import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { CollectionModule } from '../collection/collection.module';
import { PublisherModule } from '../publisher/publisher.module';
import { AuthorModule } from '../author/author.module';
import { GenreModule } from '../genre/genre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    CollectionModule,
    PublisherModule,
    AuthorModule,
    GenreModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
