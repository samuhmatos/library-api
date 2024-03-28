import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { PublisherModule } from './publisher/publisher.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    UserModule,
    BookModule,
    AuthorModule,
    GenreModule,
    PublisherModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
