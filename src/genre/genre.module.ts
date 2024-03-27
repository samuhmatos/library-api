import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './entities/genre.entity';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService],
  imports: [TypeOrmModule.forFeature([Genre])],
})
export class GenreModule {}
