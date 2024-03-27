import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { DeleteResult, Repository } from 'typeorm';

export type AuthorRepository = Repository<Author>;

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: AuthorRepository,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const existAuthorName = await this.findByName(createAuthorDto.name).catch(
      () => undefined,
    );

    if (existAuthorName) {
      throw new BadRequestException(`Author name is already in use`);
    }

    return this.authorRepository.save({ ...createAuthorDto });
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findById(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundException(`Author id ${id} not found`);
    }

    return author;
  }

  async findByName(name: string): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { name } });

    if (!author) {
      throw new NotFoundException(`Author name ${name} not found`);
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findById(id);

    if (updateAuthorDto?.name) {
      const existAuthorName = await this.findByName(updateAuthorDto.name).catch(
        () => undefined,
      );

      if (existAuthorName) {
        throw new BadRequestException(`Author name is already in use`);
      }
    }

    return this.authorRepository.save({
      ...author,
      ...updateAuthorDto,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.authorRepository.delete({ id });
  }
}
