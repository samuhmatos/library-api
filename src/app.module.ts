import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { PublisherModule } from './publisher/publisher.module';
import { CollectionModule } from './collection/collection.module';
import { LoanModule } from './loan/loan.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './guards/roles.guard';

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
    LoanModule,
    AuthModule,
    JwtModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
