import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { PublisherRepository, PublisherService } from '../publisher.service';
import { Publisher } from '../entities/publisher.entity';
import { publisherMock } from '../__mocks__/publisher.mock';
import { deleteResultMock } from '../../__mocks__/delete-result.mock';
import { updatePublisherMock } from '../__mocks__/update-publisher.mock';
import { createPublisherMock } from '../__mocks__/create-publisher.mock';

describe('PublisherService', () => {
  let service: PublisherService;
  let publisherRepository: PublisherRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            save: jest.fn().mockResolvedValue(publisherMock),
            find: jest.fn().mockResolvedValue([publisherMock]),
            findOne: jest.fn().mockResolvedValue(publisherMock),
            delete: jest.fn().mockResolvedValue(deleteResultMock),
          },
        },
      ],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
    publisherRepository = module.get<PublisherRepository>(
      getRepositoryToken(Publisher),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(publisherRepository).toBeDefined();
  });

  it('should return publisher on create', async () => {
    jest.spyOn(publisherRepository, 'findOne').mockResolvedValue(undefined);

    const publisher = await service.create(createPublisherMock);

    expect(publisher).toEqual(publisherMock);
  });

  it('should return error 400 if publisher name is already in use on create', async () => {
    expect(service.create(createPublisherMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return publisher list on findAll', async () => {
    const publishers = await service.findAll();

    expect(publishers).toEqual([publisherMock]);
  });

  it('should return publisher on findById', async () => {
    const publisher = await service.findById(publisherMock.id);

    expect(publisher).toEqual(publisherMock);
  });

  it('should return error 404 if publisher id is not found on findById', async () => {
    jest.spyOn(publisherRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findById(publisherMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return publisher on findByName', async () => {
    const publisher = await service.findByName(publisherMock.name);

    expect(publisher).toEqual(publisherMock);
  });

  it('should return error 404 if publisher id is not found on findByName', async () => {
    jest.spyOn(publisherRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findByName(publisherMock.name)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return publisher on update', async () => {
    jest.spyOn(service, 'findByName').mockRejectedValue(NotFoundException);

    const publisher = await service.update(
      publisherMock.id,
      updatePublisherMock,
    );

    expect(publisher).toEqual(publisherMock);
  });

  it('should return error 400 if publisher name is already in use on update', async () => {
    expect(
      service.update(publisherMock.id, updatePublisherMock),
    ).rejects.toThrow(BadRequestException);
  });

  it('should return error 404 if publisher id is not found on update', async () => {
    jest.spyOn(publisherRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.update(publisherMock.id, updatePublisherMock),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return deleteResult on remove', async () => {
    const deleteResult = await service.remove(publisherMock.id);

    expect(deleteResult).toEqual(deleteResultMock);
  });

  it('should return error 404 if publisher id is not found on remove', async () => {
    jest.spyOn(publisherRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.remove(publisherMock.id)).rejects.toThrow(NotFoundException);
  });
});
