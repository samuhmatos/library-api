import { CreateBookDto } from '../dto/create-book.dto';
import { bookMock } from './book.mock';

export const createBookMock: CreateBookDto = {
  author_id: bookMock.author_id,
  collection_id: bookMock.collection_id,
  genre_id: bookMock.genre_id,
  publisher_id: bookMock.publisher_id,
  quantity: bookMock.quantity,
  resume: bookMock.resume,
  title: bookMock.title,
};