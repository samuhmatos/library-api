import { Test, TestingModule } from '@nestjs/testing';

import { GenreController } from '../genre.controller';
import { GenreService } from '../genre.service';
import { genreMock } from '../__mocks__/genre.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { createGenreMock } from '../__mocks__/create-genre.mock';
import { updateGenreMock } from '../__mocks__/update-genre.mock';
import { ReturnGenreDto } from '../dto/return-genre.dto';
import { ReturnDeleteResultDto } from '../../dtos/return-delete-result.dto';

describe('GenreController', () => {
  let controller: GenreController;
  let genreService: GenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [
        {
          provide: GenreService,
          useValue: {
            create: jest.fn().mockResolvedValue(genreMock),
            findAll: jest.fn().mockResolvedValue([genreMock]),
            findById: jest.fn().mockResolvedValue(genreMock),
            update: jest.fn().mockResolvedValue(genreMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<GenreController>(GenreController);
    genreService = module.get<GenreService>(GenreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(genreService).toBeDefined();
  });

  it('should return genre on create', async () => {
    const genre = await controller.create(createGenreMock);

    expect(genre).toEqual(genreMock);
  });

  it('should return ReturnGenre list on findAll', async () => {
    const genres = await controller.findAll();

    expect(genres).toEqual([new ReturnGenreDto(genreMock)]);
  });

  it('should return ReturnGenre on findOne', async () => {
    const genre = await controller.findOne(genreMock.id);

    expect(genre).toEqual(new ReturnGenreDto(genreMock));
  });

  it('should return genre on update', async () => {
    const genre = await controller.update(genreMock.id, updateGenreMock);

    expect(genre).toEqual(genreMock);
  });

  it('should return genre on remove', async () => {
    const deleteResult = await controller.remove(genreMock.id);

    expect(deleteResult).toEqual(new ReturnDeleteResultDto(deleteResultMock));
  });
});
