import { authorMock } from '../../author/__mocks__/author.mock';
import { Book } from '../entities/book.entity';
import { collectionMock } from '../../collection/__mocks__/collection.mock';
import { genreMock } from '../../genre/__mocks__/genre.mock';
import { publisherMock } from '../../publisher/__mocks__/publisher.mock';

export const bookMock: Book = {
  id: 1,
  author_id: authorMock.id,
  collection_id: collectionMock.id,
  genre_id: genreMock.id,
  publisher_id: publisherMock.id,
  created_at: new Date(),
  quantity: 10,
  resume: 'Some resume',
  title: 'Book title',
};
