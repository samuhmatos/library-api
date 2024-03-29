import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { CollectionService } from '../collection/collection.service';
import { AuthorService } from '../author/author.service';
import { PublisherService } from '../publisher/publisher.service';
import { GenreService } from '../genre/genre.service';

export type BookRepository = Repository<Book>;
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: BookRepository,

    private readonly collectionService: CollectionService,
    private readonly authorService: AuthorService,
    private readonly publisherService: PublisherService,
    private readonly genreService: GenreService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const collection = await this.collectionService.findById(
      createBookDto.collection_id,
    );

    await this.authorService.findById(createBookDto.author_id);
    await this.genreService.findById(createBookDto.genre_id);
    await this.publisherService.findById(createBookDto.publisher_id);

    const books = await this.findByCollectionIdAndTitle(
      createBookDto.collection_id,
      createBookDto.title,
    );

    if (books && books.length > 0) {
      throw new BadRequestException(
        `The Book's title: ${createBookDto.title} already exists in the Collection: ${collection.name}`,
      );
    }

    return this.bookRepository.save({
      ...createBookDto,
    });
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        collection: true,
        author: true,
        genre: true,
        publisher: true,
      },
    });
  }

  async findById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
        author: true,
        publisher: true,
        collection: true,
        genre: true,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book id: ${id} not found`);
    }

    return book;
  }

  private async findByCollectionIdAndTitle(
    collection_id: number,
    title: string,
  ): Promise<Book[]> {
    return this.bookRepository.find({
      where: { collection_id, title },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findById(id);

    return this.bookRepository.save({
      ...book,
      ...updateBookDto,
    });
  }

  async updateQuantity(id: number, newQuantity: number): Promise<Book> {
    return this.update(id, {
      quantity: newQuantity,
    });
  }

  async remove(id: number) {
    await this.findById(id);

    return this.bookRepository.delete({ id });
  }
}
