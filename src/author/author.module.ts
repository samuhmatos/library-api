import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
  imports: [TypeOrmModule.forFeature([Author])],
})
export class AuthorModule {}
