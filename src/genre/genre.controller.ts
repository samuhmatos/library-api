import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { ReturnDeleteResultDto } from '../dtos/return-delete-result.dto';
import { ReturnGenreDto } from './dto/return-genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  async findAll(): Promise<ReturnGenreDto[]> {
    const genres = await this.genreService.findAll();
    return genres.map((genre) => new ReturnGenreDto(genre));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReturnGenreDto> {
    const genre = await this.genreService.findById(id);
    return new ReturnGenreDto(genre);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ReturnDeleteResultDto> {
    return new ReturnDeleteResultDto(await this.genreService.remove(id));
  }
}
