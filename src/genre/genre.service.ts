import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { DeleteResult, Repository } from 'typeorm';

export type GenreRepository = Repository<Genre>;

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: GenreRepository,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    await this.validateName(createGenreDto.name);

    return this.genreRepository.save({ ...createGenreDto });
  }

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findById(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundException(`Genre id ${id} not found`);
    }

    return genre;
  }

  async findByName(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { name } });

    if (!genre) {
      throw new NotFoundException(`Genre name ${name} not found`);
    }

    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findById(id);

    if (updateGenreDto.name) {
      await this.validateName(updateGenreDto.name);
    }

    return this.genreRepository.save({
      ...genre,
      ...updateGenreDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.genreRepository.delete({ id });
  }

  private async validateName(name: string): Promise<void> {
    const genre = await this.findByName(name).catch(() => undefined);

    if (genre) {
      throw new BadRequestException(`Genre name is already in use`);
    }
  }
}
