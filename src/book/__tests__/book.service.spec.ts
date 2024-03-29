import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BookRepository, BookService } from '../book.service';
import { Book } from '../entities/book.entity';
import { bookMock } from '../__mocks__/book.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { CollectionService } from '../../collection/collection.service';
import { collectionMock } from '../../collection/__mocks__/collection.mock';
import { GenreService } from '../../genre/genre.service';
import { genreMock } from '../../genre/__mocks__/genre.mock';
import { AuthorService } from '../../author/author.service';
import { authorMock } from '../../author/__mocks__/author.mock';
import { PublisherService } from '../../publisher/publisher.service';
import { publisherMock } from '../../publisher/__mocks__/publisher.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createBookMock } from '../__mocks__/create-book.mock';
import { updateBookMock } from '../__mocks__/update-book.mock';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: BookRepository;
  let collectionService: CollectionService;
  let genreService: GenreService;
  let publisherService: PublisherService;
  let authorService: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            save: jest.fn().mockResolvedValue(bookMock),
            find: jest.fn().mockResolvedValue([bookMock]),
            findOne: jest.fn().mockResolvedValue(bookMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
        {
          provide: CollectionService,
          useValue: {
            findById: jest.fn().mockResolvedValue(collectionMock),
          },
        },
        {
          provide: GenreService,
          useValue: {
            findById: jest.fn().mockResolvedValue(genreMock),
          },
        },
        {
          provide: AuthorService,
          useValue: {
            findById: jest.fn().mockResolvedValue(authorMock),
          },
        },
        {
          provide: PublisherService,
          useValue: {
            findById: jest.fn().mockResolvedValue(publisherMock),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<BookRepository>(getRepositoryToken(Book));
    collectionService = module.get<CollectionService>(CollectionService);
    genreService = module.get<GenreService>(GenreService);
    publisherService = module.get<PublisherService>(PublisherService);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(bookRepository).toBeDefined();
    expect(collectionService).toBeDefined();
    expect(genreService).toBeDefined();
    expect(publisherService).toBeDefined();
    expect(authorService).toBeDefined();
  });

  it('should return deleteResult on remove', async () => {
    const deleteResult = await service.remove(bookMock.id);
    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error 404 if book id is not found on remove', async () => {
    jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(bookMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return book on create', async () => {
    jest.spyOn(bookRepository, 'find').mockResolvedValue(undefined);

    const book = await service.create(createBookMock);

    expect(book).toEqual(bookMock);
  });

  it('should return error BadRequestException if already exist the title"s book on create', async () => {
    expect(service.create(createBookMock)).rejects.toThrow(BadRequestException);
  });

  it('should return book list on findAll', async () => {
    const books = await service.findAll();

    expect(books).toEqual([bookMock]);
  });

  it('should return book on findById', async () => {
    const book = await service.findById(bookMock.id);

    expect(book).toEqual(bookMock);
  });

  it('should return error 404 if book id is not found on findById', async () => {
    jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(bookMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return error 404 if book id is not found on update', async () => {
    jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.update(bookMock.id, updateBookMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return book on update', async () => {
    const book = await service.update(bookMock.id, updateBookMock);

    expect(book).toEqual(bookMock);
  });
});
