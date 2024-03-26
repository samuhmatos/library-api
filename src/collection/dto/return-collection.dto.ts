import { ReturnBookDto } from '../../book/dto/return-book.dto';
import { Collection } from '../entities/collection.entity';

export class ReturnCollectionDto {
  id: number;
  name: string;

  books?: ReturnBookDto[];

  constructor(collection: Collection) {
    this.id = collection.id;
    this.name = collection.name;

    if (collection.books) {
      this.books = collection.books.map((book) => new ReturnBookDto(book));
    }
  }
}
