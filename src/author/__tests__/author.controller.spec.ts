import { Test, TestingModule } from '@nestjs/testing';

import { AuthorController } from '../author.controller';
import { AuthorService } from '../author.service';
import { authorMock } from '../__mocks__/author.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { createAuthorMock } from '../__mocks__/create-author.mock';
import { updateAuthorMock } from '../__mocks__/update-author.mock';
import { ReturnDeleteResultDto } from '../../dtos/return-delete-result.dto';
import { ReturnAuthorDto } from '../dto/return-author.dto';

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorService: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: {
            create: jest.fn().mockResolvedValue(authorMock),
            findAll: jest.fn().mockResolvedValue([authorMock]),
            findById: jest.fn().mockResolvedValue(authorMock),
            update: jest.fn().mockResolvedValue(authorMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authorService).toBeDefined();
  });

  it('should return author on create', async () => {
    const author = await controller.create(createAuthorMock);

    expect(author).toEqual(authorMock);
  });

  it('should return author list on findAll', async () => {
    const authors = await controller.findAll();

    expect(authors).toEqual([new ReturnAuthorDto(authorMock)]);
  });

  it('should return author on findOne', async () => {
    const author = await controller.findOne(authorMock.id);

    expect(author).toEqual(new ReturnAuthorDto(authorMock));
  });

  it('should return author on update', async () => {
    const author = await controller.update(authorMock.id, updateAuthorMock);

    expect(author).toEqual(authorMock);
  });

  it('should return author on remove', async () => {
    const deleteResult = await controller.remove(authorMock.id);

    expect(deleteResult).toEqual(new ReturnDeleteResultDto(deleteResultMock));
  });
});
