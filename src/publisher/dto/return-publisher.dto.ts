import { Publisher } from '../entities/publisher.entity';

export class ReturnPublisherDto {
  id: number;
  name: string;

  constructor(publisher: Publisher) {
    this.id = publisher.id;
    this.name = publisher.name;
  }
}
