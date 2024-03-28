import { ReturnBookDto } from '../../book/dto/return-book.dto';
import { Genre } from '../entities/genre.entity';

export class ReturnGenreDto {
  id: number;
  name: string;

  books?: ReturnBookDto[];

  constructor(genre: Genre) {
    this.id = genre.id;
    this.name = genre.name;

    if (genre.books)
      this.books = genre.books.map((book) => new ReturnBookDto(book));
  }
}
