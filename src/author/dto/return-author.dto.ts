import { Author } from '../entities/author.entity';

export class ReturnAuthorDto {
  id: number;
  name: string;

  constructor(author: Author) {
    this.id = author.id;
    this.name = author.name;
  }
}
