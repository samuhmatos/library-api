import { Genre } from '../entities/genre.entity';

export class ReturnGenreDto {
  id: number;
  name: string;

  constructor(genre: Genre) {
    this.id = genre.id;
    this.name = genre.name;
  }
}
