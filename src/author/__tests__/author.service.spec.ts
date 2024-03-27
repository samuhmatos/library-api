import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthorRepository, AuthorService } from '../author.service';
import { Author } from '../entities/author.entity';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { authorMock } from '../__mocks__/author.mock';
import { createAuthorMock } from '../__mocks__/create-author.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { updateAuthorMock } from '../__mocks__/update-author.mock';

describe('AuthorService', () => {
  let service: AuthorService;
  let authorRepository: AuthorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            save: jest.fn().mockResolvedValue(authorMock),
            find: jest.fn().mockResolvedValue([authorMock]),
            findOne: jest.fn().mockResolvedValue(authorMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    authorRepository = module.get<AuthorRepository>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(authorRepository).toBeDefined();
  });

  it('should return author on create', async () => {
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

    const author = await service.create(createAuthorMock);

    expect(author).toEqual(authorMock);
  });

  it('should return error 400 if user name is already in use on create', async () => {
    expect(service.create(createAuthorMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return author list on findAll', async () => {
    const authors = await service.findAll();

    expect(authors).toEqual([authorMock]);
  });

  it('should return author on findById', async () => {
    const author = await service.findById(authorMock.id);

    expect(author).toEqual(authorMock);
  });

  it('should return error 404 if user id is not found on findById', async () => {
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(authorMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return author on findByName', async () => {
    const author = await service.findByName(authorMock.name);

    expect(author).toEqual(authorMock);
  });

  it('should return error 404 if user id is not found on findByName', async () => {
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(authorMock.name)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return author on update', async () => {
    jest.spyOn(service, 'findByName').mockRejectedValue(NotFoundException);

    const author = await service.update(authorMock.id, updateAuthorMock);

    expect(author).toEqual(authorMock);
  });

  it('should return error 400 if user name is already in use on update', async () => {
    expect(service.update(authorMock.id, updateAuthorMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return error 404 if user id is not found on update', async () => {
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.update(authorMock.id, updateAuthorMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return deleteResult on remove', async () => {
    const deleteResult = await service.remove(authorMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error 404 if user id is not found on remove', async () => {
    jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(authorMock.id)).rejects.toThrow(NotFoundException);
  });
});
