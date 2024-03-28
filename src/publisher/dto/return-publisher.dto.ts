import { ReturnBookDto } from '../../book/dto/return-book.dto';
import { Publisher } from '../entities/publisher.entity';

export class ReturnPublisherDto {
  id: number;
  name: string;

  books?: ReturnBookDto[];

  constructor(publisher: Publisher) {
    this.id = publisher.id;
    this.name = publisher.name;

    if (publisher.books)
      this.books = publisher.books.map((book) => new ReturnBookDto(book));
  }
}
