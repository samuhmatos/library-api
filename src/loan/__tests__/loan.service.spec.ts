import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { LoanRepository, LoanService } from '../loan.service';
import { Loan } from '../entities/loan.entity';
import { finishLoanMock, loanMock } from '../__mocks__/loan.mock';
import { userMock } from '../../user/__mocks__';
import { bookMock } from '../../book/__mocks__/book.mock';
import { UserService } from '../../user/user.service';
import { BookService } from '../../book/book.service';
import {
  createLoanMock,
  createLoanWithInvalidDueDateMock,
} from '../__mocks__/create-loan.mock';
import { Book } from '../../book/entities/book.entity';

const updateQuantityBookService: Book = {
  ...bookMock,
  quantity: bookMock.quantity - createLoanMock.quantity,
};

describe('LoanService', () => {
  let service: LoanService;
  let loanRepository: LoanRepository;
  let userService: UserService;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getRepositoryToken(Loan),
          useValue: {
            save: jest.fn().mockResolvedValue(loanMock),
            find: jest.fn().mockResolvedValue([loanMock]),
            findOne: jest.fn().mockResolvedValue(loanMock),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: BookService,
          useValue: {
            findById: jest.fn().mockResolvedValue(bookMock),
            updateQuantity: jest
              .fn()
              .mockResolvedValue(updateQuantityBookService),
          },
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    loanRepository = module.get<LoanRepository>(getRepositoryToken(Loan));
    userService = module.get<UserService>(UserService);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(loanRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(bookService).toBeDefined();
  });

  it('should return loan on create', async () => {
    const spyUpdateQuantity = jest.spyOn(bookService, 'updateQuantity');
    const loan = await service.create(createLoanMock);

    const compare = await spyUpdateQuantity.mock.results[0].value;

    expect(loan).toEqual(loanMock);
    expect(compare).toEqual(updateQuantityBookService);
  });

  it('should return error 400 if loan date is bigger than due date on create', async () => {
    expect(service.create(createLoanWithInvalidDueDateMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return db exception on create', async () => {
    jest.spyOn(loanRepository, 'save').mockRejectedValue(new Error());

    expect(service.create(createLoanMock)).rejects.toThrow();
  });

  it('should return loan list on findAll', async () => {
    const loans = await service.findAll();

    expect(loans).toEqual([loanMock]);
  });

  it('should return loan on findById', async () => {
    const loan = await service.findById(loanMock.id);

    expect(loan).toEqual(loanMock);
  });

  it('should return error 404 if loan id is not found on findById', async () => {
    jest.spyOn(loanRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(loanMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return loan on finish', async () => {
    jest.spyOn(loanRepository, 'save').mockResolvedValue(finishLoanMock);

    const spyUpdateQuantity = jest
      .spyOn(bookService, 'updateQuantity')
      .mockResolvedValue({
        ...bookMock,
        quantity: bookMock.quantity + createLoanMock.quantity,
      });

    const loan = await service.finish(loanMock.id);

    const compare = await spyUpdateQuantity.mock.results[0].value;

    expect(loan).toEqual(finishLoanMock);
    expect(compare).toEqual({
      ...bookMock,
      quantity: bookMock.quantity + createLoanMock.quantity,
    });
  });

  it('should return error 404 if loan id is not found on finish', async () => {
    jest.spyOn(loanRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.finish(loanMock.id)).rejects.toThrow(NotFoundException);
  });
});
