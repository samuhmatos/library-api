import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { GenreRepository, GenreService } from '../genre.service';
import { Genre } from '../entities/genre.entity';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { createGenreMock } from '../__mocks__/create-genre.mock';
import { genreMock } from '../__mocks__/genre.mock';
import { updateGenreMock } from '../__mocks__/update-genre.mock';

describe('GenreService', () => {
  let service: GenreService;
  let genreRepository: GenreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            save: jest.fn().mockResolvedValue(genreMock),
            find: jest.fn().mockResolvedValue([genreMock]),
            findOne: jest.fn().mockResolvedValue(genreMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<GenreService>(GenreService);
    genreRepository = module.get<GenreRepository>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(genreRepository).toBeDefined();
  });

  it('should return genre on create', async () => {
    jest.spyOn(genreRepository, 'findOne').mockResolvedValue(undefined);

    const genre = await service.create(createGenreMock);

    expect(genre).toEqual(genreMock);
  });

  it('should return error 400 if genre name is already in use on create', async () => {
    expect(service.create(createGenreMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return genre list on findAll', async () => {
    const genres = await service.findAll();

    expect(genres).toEqual([genreMock]);
  });

  it('should return genre on findById', async () => {
    const genre = await service.findById(genreMock.id);

    expect(genre).toEqual(genreMock);
  });

  it('should return error 404 if genre id is not found on findById', async () => {
    jest.spyOn(genreRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(genreMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should return genre on findByName', async () => {
    const genre = await service.findByName(genreMock.name);

    expect(genre).toEqual(genreMock);
  });

  it('should return error 404 if genre id is not found on findByName', async () => {
    jest.spyOn(genreRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(genreMock.name)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return genre on update', async () => {
    jest.spyOn(service, 'findByName').mockRejectedValue(NotFoundException);

    const genre = await service.update(genreMock.id, updateGenreMock);

    expect(genre).toEqual(genreMock);
  });

  it('should return error 400 if genre name is already in use on update', async () => {
    expect(service.update(genreMock.id, updateGenreMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return error 404 if genre id is not found on update', async () => {
    jest.spyOn(genreRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.update(genreMock.id, updateGenreMock)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return deleteResult on remove', async () => {
    const deleteResult = await service.remove(genreMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error 404 if genre id is not found on remove', async () => {
    jest.spyOn(genreRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(genreMock.id)).rejects.toThrow(NotFoundException);
  });
});
