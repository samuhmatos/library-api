import { Test, TestingModule } from '@nestjs/testing';

import { PublisherController } from '../publisher.controller';
import { PublisherService } from '../publisher.service';
import { createPublisherMock } from '../__mocks__/create-publisher.mock';
import { updatePublisherMock } from '../__mocks__/update-publisher.mock';
import { publisherMock } from '../__mocks__/publisher.mock';
import { ReturnDeleteResultDto } from '../../dtos/return-delete-result.dto';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { ReturnPublisherDto } from '../dto/return-publisher.dto';

describe('PublisherController', () => {
  let controller: PublisherController;
  let publisherService: PublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublisherController],
      providers: [
        {
          provide: PublisherService,
          useValue: {
            create: jest.fn().mockResolvedValue(publisherMock),
            findAll: jest.fn().mockResolvedValue([publisherMock]),
            findById: jest.fn().mockResolvedValue(publisherMock),
            update: jest.fn().mockResolvedValue(publisherMock),
            remove: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    controller = module.get<PublisherController>(PublisherController);
    publisherService = module.get<PublisherService>(PublisherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(publisherService).toBeDefined();
  });

  it('should return publisher on create', async () => {
    const publisher = await controller.create(createPublisherMock);

    expect(publisher).toEqual(publisherMock);
  });

  it('should return publisher list on findAll', async () => {
    const publishers = await controller.findAll();

    expect(publishers).toEqual([new ReturnPublisherDto(publisherMock)]);
  });

  it('should return publisher on findOne', async () => {
    const publisher = await controller.findOne(publisherMock.id);

    expect(publisher).toEqual(new ReturnPublisherDto(publisherMock));
  });

  it('should return publisher on update', async () => {
    const publisher = await controller.update(
      publisherMock.id,
      updatePublisherMock,
    );

    expect(publisher).toEqual(publisherMock);
  });

  it('should return publisher on remove', async () => {
    const deleteResult = await controller.remove(publisherMock.id);

    expect(deleteResult).toEqual(new ReturnDeleteResultDto(deleteResultMock));
  });
});
