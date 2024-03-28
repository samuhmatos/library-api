import { ReturnAuthorDto } from '../../author/dto/return-author.dto';
import { ReturnCollectionDto } from '../../collection/dto/return-collection.dto';
import { Book } from '../entities/book.entity';
import { ReturnGenreDto } from '../../genre/dto/return-genre.dto';
import { ReturnPublisherDto } from '../../publisher/dto/return-publisher.dto';

export class ReturnBookDto {
  id: number;
  title: string;
  resume: string;
  quantity: number;

  collection?: ReturnCollectionDto;
  author?: ReturnAuthorDto;
  genre?: ReturnGenreDto;
  publisher?: ReturnPublisherDto;

  constructor(book: Book) {
    this.id = book.id;
    this.title = book.title;
    this.resume = book.resume;
    this.quantity = book.quantity;

    if (book.collection)
      this.collection = new ReturnCollectionDto(book.collection);

    if (book.author) this.author = new ReturnAuthorDto(book.author);

    if (book.genre) this.genre = new ReturnGenreDto(book.genre);

    if (book.publisher) this.publisher = new ReturnPublisherDto(book.publisher);
  }
}
