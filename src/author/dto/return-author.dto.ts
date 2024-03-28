import { ReturnBookDto } from '../../book/dto/return-book.dto';
import { Author } from '../entities/author.entity';

export class ReturnAuthorDto {
  id: number;
  name: string;

  books?: ReturnBookDto[];

  constructor(author: Author) {
    this.id = author.id;
    this.name = author.name;

    if (author.books)
      this.books = author.books.map((book) => new ReturnBookDto(book));
  }
}
