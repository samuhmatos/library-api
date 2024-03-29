import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { bookMock } from '../__mocks__/book.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { createBookMock } from '../__mocks__/create-book.mock';
import { updateBookMock } from '../__mocks__/update-book.mock';
import { ReturnBookDto } from '../dto/return-book.dto';
import { ReturnDeleteResultDto } from '../../dtos/return-delete-result.dto';

describe('BookController', () => {
  let controller: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn().mockResolvedValue(bookMock),
            findAll: jest.fn().mockResolvedValue([bookMock]),
            findById: jest.fn().mockResolvedValue(bookMock),
            update: jest.fn().mockResolvedValue(bookMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(bookService).toBeDefined();
  });

  it('should return book on create', async () => {
    const book = await controller.create(createBookMock);

    expect(book).toEqual(bookMock);
  });

  it('should return book list on findAll', async () => {
    const books = await controller.findAll();

    expect(books).toEqual([new ReturnBookDto(bookMock)]);
  });

  it('should return book on findOne', async () => {
    const book = await controller.findOne(bookMock.id);

    expect(book).toEqual(new ReturnBookDto(bookMock));
  });

  it('should return book on update', async () => {
    const book = await controller.update(bookMock.id, updateBookMock);

    expect(book).toEqual(bookMock);
  });

  it('should return book on remove', async () => {
    const deleteResult = await controller.remove(bookMock.id);

    expect(deleteResult).toEqual(new ReturnDeleteResultDto(deleteResultMock));
  });
});
